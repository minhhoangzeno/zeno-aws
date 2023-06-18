import { Button, Form, Input, message, Modal, Row, Typography } from "antd";
import { useEffect } from "react";
import { DurationTimeAPI } from "../../apis/durationTime.api";
import { useAppDispatch } from "../../app/hooks";
import { UpdateDurationTime } from "../../app/reducers/DurationTime/DurationTime.reducer";
import { IDurationTime } from "../../interface/DurationTime.interface";

interface IEditurationTimeProps {
  isModalOpen: boolean;
  setIsModalOpen: (el: boolean) => void;
  record: IDurationTime;
}
const ModalEditDurationTime = (props: IEditurationTimeProps) => {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen, record } = props;
  const dispatch = useAppDispatch();
  useEffect(() => {
    form.setFieldsValue({
      title: record.title,
    });
  }, [record, form, isModalOpen]);
  const onFinishFailed = () => {
    message.error("Error!");
  };

  const onFinish = (values: IDurationTime) => {
    if (record.id) {
      DurationTimeAPI.update(record.id, values)
        .then((result) => {
          message.success("Success");
          dispatch(UpdateDurationTime(result.data));
          setIsModalOpen(false);
        })
        .catch(() => {
          message.error("Error!");
        });
    }
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        title={<Typography.Text>Sửa khung giờ</Typography.Text>}
      >
        <Row>
          <Form
            form={form}
            colon={false}
            autoComplete="off"
            className="w-full"
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
          >
            <Form.Item label="Tiêu đề" name="title" required>
              <Input />
            </Form.Item>
            <Row className="justify-end">
              <Button className="mr-4" onClick={() => setIsModalOpen(false)}>
                Đóng
              </Button>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Row>
          </Form>
        </Row>
      </Modal>
    </>
  );
};

export default ModalEditDurationTime;
