import { Button, Form, Input, message, Modal, Row, Typography } from "antd";
import { DurationTimeAPI } from "../../apis/durationTime.api";
import { useAppDispatch } from "../../app/hooks";
import { AddDurationTime } from "../../app/reducers/DurationTime/DurationTime.reducer";
import { IDurationTime } from "../../interface/DurationTime.interface";

interface AddDurationTimeProps {
  isModalOpen: boolean;
  setIsModalOpen: (el: boolean) => void;
}

export default function ModalAddDurationTime(props: AddDurationTimeProps) {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen } = props;
  const dispatch = useAppDispatch();
  const onFinishFailed = () => {
    message.error("Error!");
  };
  const onFinish = (values: IDurationTime) => {
    DurationTimeAPI.add(values)
      .then((result) => {
        dispatch(AddDurationTime(result.data));
        message.success("Success");
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("err", err);

        message.error("Error!");
      });
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        title={<Typography.Text>Thêm khung giờ</Typography.Text>}
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
}
