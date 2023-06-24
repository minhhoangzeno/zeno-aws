import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, message, Popconfirm, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser, UserLogout } from '../app/reducers/Auth/Auth.reducer';
import logo_admin from '../assets/images/admin.png';
import { useEffect, useState } from 'react';
import ModalTarget from './target/ModalTarget';
import { GetTarget } from '../app/reducers/Target/Target.reducer';
import TargetPNG from '../assets/images/target.png';

const { Header } = Layout;
export default function HeaderComponent() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const auth = useAppSelector(selectUser);
  const openFirst = useAppSelector(GetTarget);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const currentDate = new Date();
  // const currentMonth = currentDate.getMonth() + 1;
  // const currentYear = currentDate.getFullYear();

  useEffect(() => {
    if (openFirst) setShowModal(true);
    // eslint-disable-next-line
  }, []);

  return (
    <Header>
      {showModal && (
        <ModalTarget
          modalOpen={showModal}
          setModalOpen={setShowModal}
        />
      )}
      <Row className="h-full justify-end items-center">
        <Button
          icon={
            <img
              alt="mục tiêu"
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
        <Avatar
          src={auth?.avatar ? auth.avatar : logo_admin}
          size="default"
        />
        <Popconfirm
          title="Bạn chắc chắn muốn đăng xuất"
          onConfirm={() => {
            dispatch(UserLogout());
            message.success('Logout success!');
            navigate('/login');
          }}>
          <Button
            icon={<LogoutOutlined />}
            type="ghost"
            className="text-white">
            Đăng xuất
          </Button>
        </Popconfirm>
      </Row>
    </Header>
  );
}
