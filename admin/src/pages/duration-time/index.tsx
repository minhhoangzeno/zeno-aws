import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { FeedbackAPI } from "../../apis/feedback.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteFeedback,
  GetFeedback,
  SetFeedback,
} from "../../app/reducers/Feedback/Feedback.reducer";
import productPNG from "../../assets/images/product.png";
import { IFeedback } from "../../interface/Feedback.interface";

const { Title, Paragraph, Text } = Typography;

export default function DurationTime() {
  const data = useAppSelector(GetFeedback);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // useEffect(() => {
  //   FeedbackAPI.fetchAll().then((result) => {
  //     dispatch(SetFeedback(result.data));
  //   });
  // }, [dispatch]);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_: null, record: IFeedback) => {
        const idx = data.findIndex((el: IFeedback) => el.id === record.id);
        return <Typography.Title level={5}>{idx + 1}</Typography.Title>;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      width: "20%",
      editable: true,
      render: (_: null, record: IFeedback) => {
        return (
          <Tooltip title={record.content} placement="bottom">
            <Paragraph ellipsis={{ rows: 2, suffix: "..." }}>
              {record.content}
            </Paragraph>
          </Tooltip>
        );
      },
    },
    {
      title: "Avatar",
      dataIndex: "color",
      width: "8%",
      render: (_: null, record: IFeedback) => {
        return (
          <>
            <Avatar
              src={record.account?.avatar ? record.account?.avatar : productPNG}
              size="large"
            />
          </>
        );
      },
    },
    {
      title: "Người gửi",
      width: "13%",
      editable: true,
      render: (_: null, record: IFeedback) => {
        return <Text>{record.account?.name}</Text>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      editable: true,
      render: (_: null, record: IFeedback) => {
        return <Text>{record.account?.email}</Text>;
      },
    },
    {
      title: "SDT",
      dataIndex: "phoneNumber",
      width: "12%",
      editable: true,
      render: (_: null, record: IFeedback) => {
        return <Text>{record.account?.phone}</Text>;
      },
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IFeedback) => {
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

            <Typography.Link className="mr-4">
              <EditOutlined style={{ fontSize: "130%" }} />
            </Typography.Link>
          </>
        );
      },
    },
  ];

  const deleteRecord = (record: IFeedback) => {
    if (record.id) {
      FeedbackAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteFeedback(record));
        })
        .catch((err) => {
          message.error("Error");
        });
    }
  };

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

      <Modal open={isModalOpen} destroyOnClose={true}>
        <Form form={form} colon={false} autoComplete="off">
          <Form.Item label="Tiêu đề" name="title" required>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Table columns={columns} dataSource={data} bordered rowKey="id" />
    </>
  );
}
