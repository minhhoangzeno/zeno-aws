import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect } from "react";
import { AccountAPI } from "../../apis/account.api";
import { useAppDispatch } from "../../app/hooks";
import { AddAccount } from "../../app/reducers/Account/Account.reducer";
import { UserLevels } from "../../interface/constants/UserLevels.const";

const { Text } = Typography;
const { Option } = Select;
interface IFormValue {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  roleId: number;
}

interface IModalAddAccountProps {
  modalOpen: boolean;
  setModalOpen: (el: boolean) => void;
}

export default function ModalAddAccount(props: IModalAddAccountProps) {
  const { modalOpen, setModalOpen } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  useEffect(() => {
    form.setFieldValue("roleId", 3);
  }, [form, modalOpen]);
  const onFinish = (values: IFormValue) => {
    console.log("values", values);

    if (values.password !== values.confirmPassword) {
      message.info("Mật khẩu chưa khớp!");
    } else {
      let typeRole = UserLevels.USER;
      if (values.roleId === 2) typeRole = UserLevels.LEADER;
      AccountAPI.add({ ...values, typeRole })
        .then((result) => {
          AccountAPI.changeRole(result.data.id, values.roleId).then(() => {
            dispatch(
              AddAccount({
                ...result.data,
                roleId: values.roleId,
              })
            );
            message.success("Success");
            setModalOpen(false);
          });
        })
        .catch(() => {
          message.error("Error");
          setModalOpen(false);
        });
    }
  };

  const onFinishFailed = () => {
    message.error("Error!");
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        title={<Typography.Text>Thêm người dùng</Typography.Text>}
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
        forceRender
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          colon={false}
          autoComplete="off"
        >
          <Text>Tên</Text>
          <Form.Item name="name" required label="">
            <Input />
          </Form.Item>
          <Text>Email</Text>
          <Form.Item name="email" required label="">
            <Input />
          </Form.Item>
          <Text>Mật khẩu</Text>
          <Form.Item name="password" required label="">
            <Input.Password />
          </Form.Item>
          <Text>Xác nhận mật khẩu </Text>
          <Form.Item name="confirmPassword" required label="">
            <Input.Password />
          </Form.Item>
          <Text>Số điện thoại</Text>
          <Form.Item name="phone" label="">
            <Input />
          </Form.Item>
          <Text>Role</Text>
          <Form.Item name="roleId" label="">
            <Select>
              <Option value={2}>{UserLevels.LEADER}</Option>
              <Option value={3}>{UserLevels.USER}</Option>
            </Select>
          </Form.Item>

          <Row className="justify-end">
            <Button className="mr-4" onClick={() => setModalOpen(false)}>
              Đóng
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
