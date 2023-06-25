import {
  Button,
  Form,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect } from "react";
import { OrderAPI } from "../../apis/order.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/reducers/Auth/Auth.reducer";
import { GetDurationTime } from "../../app/reducers/DurationTime/DurationTime.reducer";
import { AddOrder } from "../../app/reducers/Order/Order.reducer";
import { IOrder } from "../../interface/Order.interface";
import "./index.css";
interface AddOrderProps {
  isModalOpen: boolean;
  setIsModalOpen: (el: boolean) => void;
}
const { Option } = Select;
export default function ModalAddOrder(props: AddOrderProps) {
  const [form] = Form.useForm();
  const { isModalOpen, setIsModalOpen } = props;
  const durationTimeList = useAppSelector(GetDurationTime);
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectUser);

  useEffect(() => {
    if (durationTimeList.length > 0 && durationTimeList[0].id)
      form.setFieldValue("durationTimeId", durationTimeList[0].id);
  }, [isModalOpen, durationTimeList, form]);

  const onFinishFailed = () => {
    message.error("Error!");
  };
  const onFinish = (values: IOrder) => {
    OrderAPI.add({ ...values, accountId: auth?.id, teamId: auth?.teamId })
      .then((result) => {
        dispatch(AddOrder(result.data));
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
        width={840}
        open={isModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        forceRender
        title={<Typography.Text>Thêm báo cáo</Typography.Text>}
      >
        <Row>
          <Form
            name="order"
            form={form}
            colon={false}
            autoComplete="off"
            className="w-full"
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
          >
            <Row className="justify-between">
              <ul className="form-item">
                <li>
                  <Typography.Text>Số cuộc gọi đã gọi</Typography.Text>
                </li>
                <li>
                  <Form.Item label="" name="numberOfCall" required>
                    <InputNumber />
                  </Form.Item>
                </li>
              </ul>
              <ul className="form-item">
                <li>
                  <Typography.Text>Số cuộc gọi đã tư vấn</Typography.Text>
                </li>
                <li>
                  <Form.Item label="" name="numberOfAdvise" required>
                    <InputNumber />
                  </Form.Item>
                </li>
              </ul>
            </Row>

            <Row className="justify-between">
              <ul className="form-item">
                <li>
                  <Typography.Text>Số cuộc gọi chốt</Typography.Text>
                </li>
                <li>
                  <Form.Item label="" name="numberOfOrder" required>
                    <InputNumber />
                  </Form.Item>
                </li>
              </ul>
              <ul className="form-item">
                <li>
                  <Typography.Text>Số cuộc gọi xác nhận</Typography.Text>
                </li>
                <li>
                  <Form.Item label="" name="numberOfAccepted" required>
                    <InputNumber />
                  </Form.Item>
                </li>
              </ul>
            </Row>
            <Row className="justify-between">
              <ul className="form-item">
                <li>
                  <Typography.Text>Doanh thu chốt</Typography.Text>
                </li>
                <li>
                  <Form.Item label="" name="revenueOfOrder" required>
                    <InputNumber />
                  </Form.Item>
                </li>
              </ul>
              <ul className="form-item">
                <li>
                  <Typography.Text>Doanh thu xác nhận</Typography.Text>
                </li>
                <li>
                  <Form.Item label="" name="revenueOfAccepted" required>
                    <InputNumber />
                  </Form.Item>
                </li>
              </ul>
            </Row>
            <Row className="justify-between">
              <ul className="form-item">
                <li>
                  <Typography.Text>Khung giờ</Typography.Text>
                </li>
                <li>
                  <Form.Item label="" name="durationTimeId" required>
                    <Select>
                      {durationTimeList.length > 0 &&
                        durationTimeList.map((el) => {
                          return (
                            <Option key={el.id} value={el.id}>
                              {el.title}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </li>
              </ul>
            </Row>
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
