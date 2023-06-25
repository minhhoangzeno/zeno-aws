import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, MenuProps, message, Popconfirm, Row, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser, UserLogout } from '../app/reducers/Auth/Auth.reducer';
import logo_admin from '../assets/images/admin.png';
import { useEffect, useState } from 'react';
import ModalTarget from './target/ModalTarget';
import { GetTarget } from '../app/reducers/Target/Target.reducer';
import TargetPNG from '../assets/images/target.png';
import './index.css';
import ModalChangePassword from './change-password/ModalChangePassword';

const { Text } = Typography;

const { Header } = Layout;
export default function HeaderComponent() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalChangePassword, setShowModalChangePassword] = useState<boolean>(false);
  const auth = useAppSelector(selectUser);
  const openFirst = useAppSelector(GetTarget);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (openFirst) setShowModal(true);
    // eslint-disable-next-line
  }, []);

  const items: MenuProps['items'] = [
    {
      key: '1',

      label: (
        <Text
          onClick={() => {
            setShowModalChangePassword(true);
          }}>
          Đổi mật khẩu
        </Text>
      ),
    },
    {
      key: '2',
      label: (
        <Text
          className="text-black"
          onClick={() => {
            dispatch(UserLogout());
            message.success('Logout success!');
            navigate('/login');
          }}>
          {<LogoutOutlined style={{ marginRight: 4 }} />}
          Đăng xuất
        </Text>
      ),
    },
  ];
  return (
    <Header>
      <ModalChangePassword
        modalOpen={showModalChangePassword}
        setModalOpen={setShowModalChangePassword}
      />

      <ModalTarget
        modalOpen={showModal}
        setModalOpen={setShowModal}
      />

      <Row className="h-full justify-end items-center">
        <Button
          icon={
            <img
              alt="Mục tiêu"
              className="h-10 w-10 object-cover"
              src={TargetPNG}></img>
          }
          type="ghost"
          title="Mục tiêu"
          className="text-white text-[25px] text-center flex items-center justify-center mr-6  "
          onClick={() => {
            setShowModal(true);
          }}
        />
        <Dropdown menu={{ items }}>
          <Space>
            <Avatar
              src={auth?.avatar ? auth.avatar : logo_admin}
              size="default"
            />
            <DownOutlined style={{ color: 'white', marginLeft: '5px' }} />
          </Space>
        </Dropdown>
      </Row>
    </Header>
  );
}
