import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from "@ant-design/icons";
import {
  Button,
  message,
  Popconfirm,
  Row,
  Table, Typography
} from "antd";
import { useEffect, useState } from "react";
import { AccountAPI } from "../../apis/account.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteAccount,
  GetAccount,
  SetAccount
} from "../../app/reducers/Account/Account.reducer";
import ModalAddAccount from "../../components/account/ModalAddAccount";
import ModalEditAccount from "../../components/account/ModalEditAccount";
import { IAccount } from "../../interface/Account.interface";

import "./index.css";

export default function Account() {
  const data = useAppSelector(GetAccount);
  const dispatch = useAppDispatch();

  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);

  useEffect(() => {
    AccountAPI.fetchAll().then((result) => {
      console.log(result.headers);

      dispatch(SetAccount(result.data));
    });
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_: null, __: IAccount, index: number) => {
        return <Typography.Title level={5}>{index + 1}</Typography.Title>;
      },
    },
    {
      title: "Tên",
      width: "40%",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "10%",
    },
    {
      title: "Role",
      width: "10%",
      dataIndex: "typeRole",
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IAccount) => {
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
          onClick={() => setShowModalAdd(true)}
        ></Button>
      </Row>
      <ModalAddAccount
        modalOpen={showModalAdd}
        setModalOpen={setShowModalAdd}
      />

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

interface ITableItemProps {
  record: IAccount;
}
function TableItem(props: ITableItemProps) {
  const { record } = props;
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const deleteRecord = (record: IAccount) => {
    if (record.id) {
      AccountAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteAccount(record));
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
        onConfirm={() => deleteRecord(record)}
      >
        <Typography.Link className="mr-4">
          <DeleteOutlined style={{ fontSize: "130%" }} />
        </Typography.Link>
      </Popconfirm>

      <Typography.Link className="mr-4" onClick={() => setModalOpen(true)}>
        <EditOutlined style={{ fontSize: "130%" }} />
      </Typography.Link>

      <ModalEditAccount
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        account={record}
      />
    </>
  );
}
