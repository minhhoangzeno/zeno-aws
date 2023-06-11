import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountAPI } from "../../apis/account.api";
import SingleLoading from "../../components/loading/Loading";
import { setToken } from "../../helper/userToken";
import { IAccount } from "../../interface/Account.interface";
import { UserLevels } from "../../interface/constants/UserLevels.const";
import "./index.css"
const { Content } = Layout;
const { Title } = Typography;

interface ILoginData {
  email: string;
  password: string;
  remember: boolean;
}
export default function Login() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<ILoginData>({
    email: "",
    password: "",
    remember: false,
  });


  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: ILoginData) => {
    setLoading(true);
    setFormValue(values);
    AccountAPI.login(values)
      .then((result) => {
        setLoading(false);
        // console.log(result);

        // Update user access token
        setToken(result.data.id, values.remember);
        // Show message toast

        AccountAPI.getMe()
          .then((result) => {
            const currentUser = result.data as IAccount;
            if (
              currentUser &&
              currentUser.roles &&
              currentUser.roles.length > 0 &&
              currentUser.roles[0].name !== UserLevels.USER
            ) {
              message.success("Login success").then();
              // Navigate to dashboard
              navigate("/dashboard");
            } else {
              message.error("Authorization!");
            }
          })
          .catch(() => {
            message.error("Login failed!");
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        message.error("Login failed!");
      });
  };

  const onFinishFailed = () => {
    message.error("Error").then((r) => console.log(r));
  };

  // let urlToChangeStream =
  //   "http://localhost:3000/api/Orders/change-stream?_format=event-stream";
  // let src = new EventSource(urlToChangeStream);
  // src.addEventListener("data", function (msg) {
  //   let data = JSON.parse(msg.data);
  //   message.info(data.type)

  // });
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
              name="login"
              initialValues={formValue}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="Email" required name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Mật khẩu" required name="password">
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Ghi nhớ mật khẩu</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </>
  );
}
