import { Button, Col, Form, Input, Layout, message, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AccountAPI } from '../../apis/account.api';
import SingleLoading from '../../components/loading/Loading';
import NotFound from '../404';
import './index.css';
import validator from 'validator';

const { Content } = Layout;

interface IResetPassword {
  password: string;
  confirmPassword: string;
}
export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [available, setAvailable] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      AccountAPI.getMeWithToken(token)
        .then(() => {
          setAvailable(true);
        })
        .catch((err) => {
          console.log(err);
          setAvailable(false);
        });
    } else {
      setAvailable(false);
    }
  }, [token]);

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

  const onFinish = (values: IResetPassword) => {
    if (values.password === values.confirmPassword && token) {
      setLoading(true);
      AccountAPI.resetPassword({ newPassword: values.password }, token)
        .then((result) => {
          setLoading(false);
          // console.log(result);
          message.success('Thành công, vui lòng đăng nhập lại!');
          navigate('/login');
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          message.error('Login failed!');
        });
    } else {
      message.error('Mật khẩu nhập lại chưa đúng!');
    }
  };

  const onFinishFailed = () => {
    message.error('Error').then((r) => console.log(r));
  };

  return (
    <>
      {loading && <SingleLoading />}
      {available ? (
        <Content className="bg-[url('./bg.png')] bg-cover w-screen h-screen flex items-center justify-center">
          <Row className="w-[90%] h-[90%] flex rounded-3xl overflow-hidden">
            <Col
              span={24}
              className="bg-white h-full flex flex-col items-center justify-center">
              <Form
                name="reset-password"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <ul>
                  <li className="flex items-center mb-2">
                    <div className="title">Mật khẩu mới</div>
                    <Form.Item
                      label=""
                      required
                      name="password"
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
                      ]}>
                      <Input.Password size="large" />
                    </Form.Item>
                  </li>
                  <li className="flex items-center mb-2">
                    <div className="title">Nhập mật khẩu mới</div>
                    <Form.Item
                      label=""
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
                      name="confirmPassword">
                      <Input.Password size="large" />
                    </Form.Item>
                  </li>

                  <li className="flex items-center mb-6">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit">
                        Xác nhận
                      </Button>
                    </Form.Item>
                  </li>
                </ul>
              </Form>
            </Col>
          </Row>
        </Content>
      ) : (
        <NotFound />
      )}
    </>
  );
}
