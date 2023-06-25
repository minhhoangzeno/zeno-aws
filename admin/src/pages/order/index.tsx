import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { DurationTimeAPI } from "../../apis/durationTime.api";
import { OrderAPI } from "../../apis/order.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../../app/reducers/Auth/Auth.reducer";
import {
  GetDurationTime,
  SetDurationTime,
} from "../../app/reducers/DurationTime/DurationTime.reducer";
import {
  DeleteOrder,
  GetOrder,
  SetOrder,
} from "../../app/reducers/Order/Order.reducer";
import ModalAddOrder from "../../components/order/ModalAddOrder";
import ModalEditOrder from "../../components/order/ModalEditOrder";
import { FormatCurrency } from "../../helper/currency.helper";

import { IOrder } from "../../interface/Order.interface";

export default function Order() {
  const data = useAppSelector(GetOrder);
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectUser);
  const durationTimeList = useAppSelector(GetDurationTime);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    if (auth?.id) {
      OrderAPI.fetchByAccount(auth.id).then((result) => {
        dispatch(SetOrder(result.data));
      });
    }
    DurationTimeAPI.fetchAll().then((result) => {
      dispatch(SetDurationTime(result.data));
    });
  }, [dispatch, auth?.id]);

  const columns = [
    {
      title: "STT",
      render: (_: null, __: IOrder, index: number) => {
        return <Typography.Title level={5}>{index + 1}</Typography.Title>;
      },
    },
    {
      title: "Số SĐT gọi",
      dataIndex: "numberOfCall",
      width: "12%",
    },
    {
      title: "Số SĐT tư vấn",
      dataIndex: "numberOfAdvise",
      width: "12%",
    },
    {
      title: "Số SĐT chốt",
      dataIndex: "numberOfOrder",
      width: "11%",
    },
    {
      title: "Số SĐT xác nhận",
      dataIndex: "numberOfAccepted",
      width: "14%",
    },
    {
      title: "Doanh thu chốt",
      dataIndex: "revenueOfOrder",
      render: (_: null, record: IOrder) => {
        return (
          <>{record.revenueOfOrder && FormatCurrency(record.revenueOfOrder)}</>
        );
      },
    },
    {
      title: "Doanh thu xác nhận",
      dataIndex: "revenueOfAccepted",
      render: (_: null, record: IOrder) => {
        return (
          <>
            {record.revenueOfAccepted &&
              FormatCurrency(record.revenueOfAccepted)}
          </>
        );
      },
    },
    {
      title: "Khung giờ",
      render: (_: null, record: IOrder) => {
        const index = durationTimeList.findIndex(
          (el) => el.id === record.durationTimeId
        );
        return <>{index > -1 && durationTimeList[index].title}</>;
      },
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IOrder) => {
        return <TableItem record={record} />;
      },
    },
  ];

  return (
    <>
      <Row className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="mr-4"
          onClick={() => {
            if (auth?.teamId) {
              setIsModalOpen(true);
            } else {
              message.info("Bạn chưa vào team!!!");
            }
          }}
        ></Button>
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
        pagination={false}
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
          message.error("Error");
        });
    }
  };
  return (
    <>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa không?"
        onConfirm={deleteRecord}
      >
        <Typography.Link className="mr-4">
          <DeleteOutlined style={{ fontSize: "130%" }} />
        </Typography.Link>
      </Popconfirm>

      <Typography.Link className="mr-4" onClick={() => setIsModalOpen(true)}>
        <EditOutlined style={{ fontSize: "130%" }} />
      </Typography.Link>

      <ModalEditOrder
        record={record}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
