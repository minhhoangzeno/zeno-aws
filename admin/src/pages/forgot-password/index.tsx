import { Button, Col, Form, Input, Layout, message, Row } from "antd";
import { useState } from "react";
import { AccountAPI } from "../../apis/account.api";
import SingleLoading from "../../components/loading/Loading";
import { IForgotPassword } from "../../interface/request/ForgotPassword.interface";
import "./index.css";
const { Content } = Layout;

export default function ForgotPassword() {
  const [formValue, setFormValue] = useState<IForgotPassword>({
    email: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: IForgotPassword) => {
    setLoading(true);
    setFormValue(values);
    AccountAPI.reset(values)
      .then((result) => {
        setLoading(false);
        // console.log(result);
        console.log("result", result);
        // navigate("/reset-password")
        message.info("Vui lòng check mail!");
      })
      .catch((err) => {
        setLoading(false);
        message.error("Not found email!");
      });
  };

  const onFinishFailed = () => {
    message.error("Error").then((r) => console.log(r));
  };

  return (
    <>
      {loading && <SingleLoading />}
      <Content className="bg-[url('./bg.png')] bg-cover w-screen h-screen flex items-center justify-center">
        <Row className="w-[90%] h-[90%] flex rounded-3xl overflow-hidden">
          <Col
            span={24}
            className="bg-white h-full flex flex-col items-center justify-center"
          >
            <Form
              name="forgot-password"
              initialValues={formValue}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <ul>
                <li className="flex items-center mb-6">
                  <div className="title">Email</div>
                  <Form.Item label="" required name="email">
                    <Input />
                  </Form.Item>
                </li>

                <li className="flex items-center mb-6">
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Xác nhận
                    </Button>
                  </Form.Item>
                </li>
              </ul>
            </Form>
          </Col>
        </Row>
      </Content>
    </>
  );
}
