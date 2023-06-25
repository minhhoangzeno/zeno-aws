import { FieldTimeOutlined, GroupOutlined, InfoOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import './index.css';
const { Sider } = Layout;

const menuItems = [
  {
    key: '/dashboard',
    icon: <PieChartOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/account',
    icon: <UserOutlined />,
    label: 'Người dùng',
  },
  {
    key: '/team',
    icon: <GroupOutlined />,
    label: 'Nhóm',
  },
  {
    key: '/duration-time',
    icon: <FieldTimeOutlined />,
    label: 'Khung giờ',
  },
  {
    key: '/order',
    icon: <InfoOutlined />,
    label: 'Báo cáo',
  },
];
export default function SiderbarComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathName, setPathName] = useState<string>('/');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}>
      <Row
        className="items-center cursor-pointer justify-center"
        style={{ margin: 10 }}
        onClick={() => navigate('/')}>
        <Avatar
          src={logo}
          size="large"
        />
      </Row>
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathName]}
        selectedKeys={[pathName]}
        mode="inline"
        items={menuItems}
        onClick={(info) => navigate(info.key)}
      />
    </Sider>
  );
}
