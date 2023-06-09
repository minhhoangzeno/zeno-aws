import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, message, Popconfirm, Row, Table, Typography, Upload, Col, Select, Button } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { AccountAPI } from '../../apis/account.api';
import { ContainerAPI } from '../../apis/container.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DeleteAccount, GetAccount, SetAccount, UpdateAccount } from '../../app/reducers/Account/Account.reducer';
import { selectUser, UpdateUser } from '../../app/reducers/Auth/Auth.reducer';
import productPNG from '../../assets/images/product.png';
import { getAddress } from '../../helper/getAddress.helper';
import { GetFile } from '../../helper/getFile.helper';
import { IAccount } from '../../interface/Account.interface';
import { ICity } from '../../interface/Address.interface';
import { IProduct } from '../../interface/Product.interface';
import './index.css';
import TableSettingItem from './TableSettingItem';
import ModalAddAccount from './ModalAddAccount';

const { Title, Text } = Typography;
const { Option } = Select;

export default function Account() {
  const data = useAppSelector(GetAccount);
  const auth = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [location, setLocation] = useState<ICity[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);

  useEffect(() => {
    searchLocation();
  }, []);
  useEffect(() => {
    AccountAPI.fetchAll().then((result) => {
      dispatch(SetAccount(result.data.data));
    });
  }, [dispatch]);

  const searchLocation = async () => {
    const result = await getAddress();
    setLocation(result);
  };

  const upload = (record: IAccount, info: UploadChangeParam) => {
    ContainerAPI.upload(info.file.originFileObj as File).then((result) => {
      const photoURL = GetFile(result.data);
      if (record.id) {
        AccountAPI.update(record.id, { ...record, avatar: photoURL }).then((result) => {
          dispatch(UpdateAccount(result.data));
          dispatch(UpdateUser(result.data));
        });
      }
    });
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      render: (_: null, record: IAccount) => {
        const idx = data.findIndex((el: IAccount) => el.id === record.id);
        return <Typography.Title level={5}>{idx + 1}</Typography.Title>;
      },
    },
    {
      title: 'Tên',
      width: '20%',
      render: (_: null, record: IAccount) => {
        return <>{record.name}</>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '10%',
    },
    // {
    //   title: 'Số điện thoại',
    //   dataIndex: 'phone',
    //   width: '10%',
    // },
    {
      title: 'Địa chỉ',
      width: '10%',
      render: (_: null, record: IAccount) => {
        const city = location.find((el) => el.code === record.city);
        const district = city?.districts.find((el) => el.code === record.district);
        return (
          <>
            {district?.name} - {city?.name}
          </>
        );
      },
    },
    {
      title: 'Avatar',
      width: '10%',
      render: (_: null, record: IAccount) => {
        return (
          <>
            <Upload
              customRequest={(options) => {
                if (options.onSuccess) {
                  options.onSuccess('ok');
                }
              }}
              onChange={(e) => upload(record, e)}
              maxCount={1}
              showUploadList={false}
              className="cursor-pointer"
              disabled={auth?.id !== record.id}>
              <Avatar
                src={record.avatar ? record.avatar : productPNG}
                size="large"
              />
            </Upload>
          </>
        );
      },
    },
    {
      title: 'Team',
      width: '10%',
    },
    {
      title: 'Role',
      width: '10%',
      render: (_: null, record: IAccount) => {
        return <TableSettingItem record={record} />;
      },
    },
    {
      title: 'Thiết lập',
      render: (_: null, record: IAccount) => {
        return (
          <>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa không?"
              onConfirm={() => deleteRecord(record)}>
              <Typography.Link className="mr-4">
                <DeleteOutlined style={{ fontSize: '130%' }} />
              </Typography.Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const deleteRecord = (record: IProduct) => {
    if (record.id) {
      AccountAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteAccount(record));
        })
        .catch((err) => {
          message.error('Error');
        });
    }
  };

  return (
    <>
      <ModalAddAccount
        modalOpen={showModalAdd}
        setModalOpen={setShowModalAdd}
      />
      <Row className="flex justify-center">
        <Title level={2}>Danh sách người dùng</Title>
      </Row>
      <Row className="mb-4">
        <Text className="mr-4 text-[20px]">Lọc theo Team</Text>
        <Select
          style={{ width: 120 }}
          defaultValue="All">
          <Option
            key={1}
            value={'All'}>
            All
          </Option>
          <Option
            key={2}
            value={'Test'}>
            Test
          </Option>
        </Select>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="ml-4"
          onClick={() => setShowModalAdd(true)}>
          Thêm mới
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}
