import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { DurationTimeAPI } from "../../apis/durationTime.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteDurationTime,
  GetDurationTime,
  SetDurationTime
} from "../../app/reducers/DurationTime/DurationTime.reducer";
import ModalAddDurationTime from "../../components/duration-time/ModalAddDurationTime";
import ModalEditDurationTime from "../../components/duration-time/ModalEditDurationTime";
import { IDurationTime } from "../../interface/DurationTime.interface";

export default function DurationTime() {
  const data = useAppSelector(GetDurationTime);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    DurationTimeAPI.fetchAll().then((result) => {
      dispatch(SetDurationTime(result.data));
    });
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      render: (_: null, __: IDurationTime, index: number) => {
        return <Typography.Title level={5}>{index + 1}</Typography.Title>;
      },
    },
    {
      title: "Khung giờ",
      dataIndex: "title",
      width: "40%",
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IDurationTime) => {
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
          onClick={() => setIsModalOpen(true)}
        ></Button>
      </Row>

      <ModalAddDurationTime
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
  record: IDurationTime;
}
function TableItem(props: ITableItemProps) {
  const { record } = props;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const deleteRecord = () => {
    if (record.id) {
      DurationTimeAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteDurationTime(record));
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

      <ModalEditDurationTime
        record={record}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
