import { Button, Form, Input, message, Modal, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { TargetAPI } from '../../apis/target.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../app/reducers/Auth/Auth.reducer';
import { ITarget } from '../../interface/Target.interface';

const { Text } = Typography;

interface IModalTarget {
  modalOpen: boolean;
  setModalOpen: (el: boolean) => void;
}

interface IFormValue {
  revenue?: number;
  worksday?: number;
  accountId?: number;
  month?: number;
  year?: number;
}
export default function ModalTarget(props: IModalTarget) {
  const auth = useAppSelector(selectUser);
  const { modalOpen, setModalOpen } = props;
  const [target, setTarget] = useState<ITarget>({});
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const currentMonthofYear = `tháng ${currentMonth} năm ${currentYear}`;

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [dispatch]);
  const search = async () => {
    await TargetAPI.fetchById(auth?.id, currentMonth, currentYear).then((res) => {
      setTarget(res.data[0]);
    });
  };
  useEffect(() => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      worksday: target?.worksday,
      revenue: target?.revenue,
    });
  }, [target, form]);

  const onFinish = (fValue: IFormValue) => {
    TargetAPI.put(
      target?.id
        ? { ...fValue, id: target.id, accountId: auth?.id, month: currentMonth, year: currentYear }
        : { ...fValue, accountId: auth?.id, month: currentMonth, year: currentYear }
    )
      .then(async (result) => {
        message.success('Success!');
        setModalOpen(false);
      })
      .catch((err) => {
        message.error('Error', err);
      });
  };
  const onFinishFailed = () => {
    message.error('Error!');
  };
  return (
    <>
      <Modal
        destroyOnClose={true}
        title={<Typography.Text>{target?.id ? 'Cập nhật Target ' : `Thêm mục tiêu ${currentMonthofYear} `}</Typography.Text>}
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
        forceRender>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          colon={false}
          autoComplete="off">
          <Text>Số ngày làm việc</Text>
          <Form.Item
            name="worksday"
            required
            className="my-4"
            label="">
            <Input />
          </Form.Item>
          <Text className="mt-4">Doanh thu</Text>
          <Form.Item
            name="revenue"
            required
            className="my-4"
            label="">
            <Input />
          </Form.Item>
          <Row className="justify-end mt-4">
            <Button
              className="mr-4"
              onClick={() => setModalOpen(false)}>
              Đóng
            </Button>
            <Button
              type="primary"
              htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
