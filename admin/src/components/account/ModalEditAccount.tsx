import { Button, Form, Input, message, Modal, Row, Select, Typography } from 'antd';
import { useEffect } from 'react';
import { AccountAPI } from '../../apis/account.api';
import { useAppDispatch } from '../../app/hooks';
import { UpdateAccount } from '../../app/reducers/Account/Account.reducer';
import { IAccount } from '../../interface/Account.interface';
import { UserLevels } from '../../interface/constants/UserLevels.const';

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
  account: IAccount;
}

export default function ModalEditAccount(props: IModalAddAccountProps) {
  const { modalOpen, setModalOpen, account } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  useEffect(() => {
    let roleId = 3;
    if (account.typeRole === UserLevels.ADMIN) {
      roleId = 1;
    } else if (account.typeRole === UserLevels.LEADER) {
      roleId = 2;
    } else if (account.typeRole === UserLevels.USER) {
      roleId = 3;
    }
    form.setFieldsValue({
      name: account.name,
      email: account.email,
      phone: account.phone,
      typeRole: account.typeRole,
      roleId,
    });
  }, [form, modalOpen, account]);
  const onFinish = (values: IFormValue) => {
    if (account.id) {
      let typeRole = UserLevels.USER;
      if (values.roleId === 1) typeRole = UserLevels.ADMIN;
      if (values.roleId === 2) typeRole = UserLevels.LEADER;
      if (values.roleId === 3) typeRole = UserLevels.USER;
      AccountAPI.update(account.id, { ...values, typeRole })
        .then((result) => {
          AccountAPI.changeRole(result.data.id, values.roleId).then(() => {
            dispatch(
              UpdateAccount({
                ...result.data,
                roleId: values.roleId,
              })
            );
            message.success('Success');
            setModalOpen(false);
          });
        })
        .catch(() => {
          message.error('Error');
          setModalOpen(false);
        });
    }
  };

  const onFinishFailed = () => {
    message.error('Error!');
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        title={<Typography.Text>Sửa thông tin</Typography.Text>}
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
          <Text>Tên</Text>
          <Form.Item
            name="name"
            required
            label="">
            <Input />
          </Form.Item>
          <Text>Email</Text>
          <Form.Item
            name="email"
            required
            label=""
            rules={[
              {
                type: 'email',
                message: 'Địa chỉ Email không hợp lệ',
              },
              { required: true, message: 'Vui lòng nhập địa chỉ email' },
            ]}>
            <Input />
          </Form.Item>
          <Text>Số điện thoại</Text>
          <Form.Item
            name="phone"
            label="">
            <Input />
          </Form.Item>
          <Text>Role</Text>
          <Form.Item
            name="roleId"
            label="">
            <Select>
              <Option value={1}>{UserLevels.ADMIN}</Option>
              <Option value={2}>{UserLevels.LEADER}</Option>
              <Option value={3}>{UserLevels.USER}</Option>
            </Select>
          </Form.Item>

          <Row className="justify-end">
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
