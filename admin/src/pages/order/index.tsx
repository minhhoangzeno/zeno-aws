import { DeleteOutlined, EditOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row, Select, Table, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { DurationTimeAPI } from '../../apis/durationTime.api';
import { OrderAPI } from '../../apis/order.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../app/reducers/Auth/Auth.reducer';
import { GetDurationTime, SetDurationTime } from '../../app/reducers/DurationTime/DurationTime.reducer';
import { DeleteOrder, GetOrder, SetOrder } from '../../app/reducers/Order/Order.reducer';
import ModalAddOrder from '../../components/order/ModalAddOrder';
import ModalEditOrder from '../../components/order/ModalEditOrder';
import { FormatCurrency } from '../../helper/currency.helper';
import { IOrder } from '../../interface/Order.interface';
import Moment from 'react-moment';
import 'moment-timezone';

const { Option } = Select;

export default function Order() {
  const [totalCount, setTotalCount] = useState<number>();
  const data = useAppSelector(GetOrder);
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectUser);
  const durationTimeList = useAppSelector(GetDurationTime);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(0);
  const limit = 8;
  const serial = limit * activePage + 1;
  const [filterDuringtime, setFilterDuringtime] = useState<number | null>(null);

  useEffect(() => {
    if (auth?.id) {
      OrderAPI.fetchByAccount(auth.id, activePage * limit, limit, filterDuringtime).then((result) => {
        setTotalCount(result.headers['x-total-count']);
        dispatch(SetOrder(result.data));
      });
    }
    DurationTimeAPI.fetchAll().then((result) => {
      dispatch(SetDurationTime(result.data));
    });
  }, [dispatch, auth?.id, activePage, filterDuringtime]);

  const handlePaginate = (e: number) => {
    setActivePage(e - 1);
  };
  const columns = [
    {
      title: 'STT',
      render: (_: null, __: IOrder, index: number) => {
        return <Typography.Title level={5}>{index + serial}</Typography.Title>;
      },
    },
    {
      title: 'Số SĐT gọi',
      dataIndex: 'numberOfCall',
      width: '10%',
    },
    {
      title: 'Số SĐT tư vấn',
      dataIndex: 'numberOfAdvise',
      width: '10%',
    },
    {
      title: 'Số SĐT chốt',
      dataIndex: 'numberOfOrder',
      width: '10%',
    },
    {
      title: 'Số SĐT xác nhận',
      dataIndex: 'numberOfAccepted',
      width: '10%',
    },
    {
      title: 'Doanh thu chốt',
      dataIndex: 'revenueOfOrder',
      render: (_: null, record: IOrder) => {
        return <>{record.revenueOfOrder && FormatCurrency(record.revenueOfOrder)}</>;
      },
    },
    {
      title: 'Doanh thu xác nhận',
      dataIndex: 'revenueOfAccepted',
      render: (_: null, record: IOrder) => {
        return <>{record.revenueOfAccepted && FormatCurrency(record.revenueOfAccepted)}</>;
      },
    },
    {
      title: 'Khung giờ',
      render: (_: null, record: IOrder) => {
        const index = durationTimeList.findIndex((el) => el.id === record.durationTimeId);
        return <>{index > -1 && durationTimeList[index].title}</>;
      },
    },
    {
      title: 'Thời gian',
      render: (_: null, record: IOrder) => {
        return <Moment format="DD/MM/YYYY hh:mm:ss">{record.updatedAt}</Moment>;
      },
    },
    {
      title: 'Thiết lập',
      render: (_: null, record: IOrder) => {
        return <TableItem record={record} />;
      },
    },
  ];

  return (
    <>
      <Row className="mb-4 justify-between">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="mr-4"
          onClick={() => {
            if (auth?.teamId) {
              setIsModalOpen(true);
            } else {
              message.info('Bạn chưa vào team!!!');
            }
          }}></Button>
        <Row>
          <FilterOutlined className="text-[20px] mr-4" />
          <Select
            defaultValue={'default'}
            className="w-[200px]"
            onSelect={(e) => {
              if (e !== 'default') {
                setFilterDuringtime(Number(e));
              } else {
                setFilterDuringtime(null);
              }
            }}>
            <Option
              key={-999}
              value={'default'}>
              --Không lọc--
            </Option>
            {durationTimeList.length > 0 &&
              durationTimeList.map((el) => {
                return (
                  <Option
                    key={el.id}
                    value={el.id}>
                    {el.title}
                  </Option>
                );
              })}
          </Select>
        </Row>
      </Row>
      <ModalAddOrder
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Table
        columns={columns}
        dataSource={data}
        bordered
        rowKey="id"
        pagination={{ pageSize: limit, total: totalCount, onChange: (e) => handlePaginate(e) }}
      />
    </>
  );
}

interface ITableItemProps {
  record: IOrder;
}
function TableItem(props: ITableItemProps) {
  const { record } = props;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const deleteRecord = () => {
    if (record.id) {
      OrderAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteOrder(record));
        })
        .catch((err) => {
          message.error('Error');
        });
    }
  };
  return (
    <>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa không?"
        onConfirm={deleteRecord}>
        <Typography.Link className="mr-4">
          <DeleteOutlined style={{ fontSize: '130%' }} />
        </Typography.Link>
      </Popconfirm>

      <Typography.Link
        className="mr-4"
        onClick={() => setIsModalOpen(true)}>
        <EditOutlined style={{ fontSize: '130%' }} />
      </Typography.Link>

      <ModalEditOrder
        record={record}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
