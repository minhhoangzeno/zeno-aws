import { Button, Form, Input, message, Modal, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { AccountAPI } from '../../apis/account.api';
import { useAppDispatch } from '../../app/hooks';
import validator from 'validator';

const { Text } = Typography;

interface IModalChangePassword {
  modalOpen: boolean;
  setModalOpen: (el: boolean) => void;
}

interface IFormValue {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
export default function ModalChangePassword(props: IModalChangePassword) {
  const { modalOpen, setModalOpen } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [dispatch]);
  const search = async () => {};

  const validate = (value: string) => {
    if (value.length === 0) {
      return true;
    }
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onFinish = (fValue: IFormValue) => {
    if (fValue.confirmPassword === fValue.newPassword) {
      AccountAPI.changePassword({ newPassword: fValue.newPassword, oldPassword: fValue.oldPassword })
        .then(() => {
          message.success('Success!');
          setModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
          message.error('Error');
        });
    } else {
      message.error('Mật khẩu nhập lại chưa đúng');
    }
  };
  const onFinishFailed = () => {
    message.error('Error!');
  };
  return (
    <>
      <Modal
        destroyOnClose={true}
        title={<Typography.Text>Thay đổi mật khẩu</Typography.Text>}
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
          <Text>Nhập mật khẩu cũ</Text>
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: 'Mật khẩu không để trống !',
              },
              {
                validator(rule, value) {
                  if (validate(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject('Error');
                  }
                },
                message: 'Vui lòng nhập mật khẩu tối thiểu 8 kí tự, có ít nhất 1 kí tự viết hóa , 1 chữ số và 1 kí tự đặc biệt',
              },
            ]}
            required
            className="my-4"
            hasFeedback
            label="">
            <Input.Password />
          </Form.Item>
          <Text className="mt-4">Nhập mật khẩu mới</Text>
          <Form.Item
            name="newPassword"
            required
            rules={[
              {
                required: true,
                message: 'Mật khẩu không để trống !',
              },
              {
                validator(rule, value) {
                  if (validate(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject('Error');
                  }
                },
                message: 'Vui lòng nhập mật khẩu tối thiểu 8 kí tự, có ít nhất 1 kí tự viết hóa , 1 chữ số và 1 kí tự đặc biệt',
              },
            ]}
            className="my-4"
            hasFeedback
            label="">
            <Input.Password />
          </Form.Item>
          <Text className="mt-4">Xác nhận mật khẩu</Text>
          <Form.Item
            name="confirmPassword"
            required
            rules={[
              {
                required: true,
                message: 'Xác nhận mật khẩu không để trống !',
              },
              {
                validator(rule, value) {
                  if (validate(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject('Error');
                  }
                },
                message: 'Vui lòng nhập mật khẩu tối thiểu 8 kí tự, có ít nhất 1 kí tự viết hóa , 1 chữ số và 1 kí tự đặc biệt',
              },
            ]}
            className="my-4"
            hasFeedback
            label="">
            <Input.Password />
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
