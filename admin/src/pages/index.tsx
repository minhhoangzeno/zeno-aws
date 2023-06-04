import {
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { UploadChangeParam } from "antd/es/upload";
import axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  AddFile,
  DeleteFile,
  GetFile,
  SetFile,
} from "../app/reducers/File/File.reducer";
import { IFile } from "../interface/File.interface";
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const files = useAppSelector(GetFile);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [folderRandom, setFolderRandom] = useState<string>("");

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleUpload = (info: UploadChangeParam) => {
    info.fileList.forEach((el) => {
      if (el.status === "done") {
        let tempFile: IFile = {
          name: el.name,
          transactionID: "",
          status: "",
          id: uuidv4(),
        };

        const reader = new FileReader();
        reader.readAsText(el.originFileObj as File);
        reader.onloadend = async (event) => {
          const readerData = event.target?.result;

          if (readerData && typeof readerData === "string") {
            const encoded = encodeURIComponent(readerData);
            tempFile.content = encoded;
            dispatch(AddFile(tempFile));
          }
        };
      }
    });
  };

  const reset = () => {
    dispatch(SetFile([]));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns = [
    {
      title: "STT",
      render: (_: null, record: IFile, index: number) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "ID",
      dataIndex: "transactionID",
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Cài đặt",
      render: (_: null, record: IFile) => {
        return (
          <>
            <Row className="items-center">
              <Popconfirm
                title="Bạn có muốn xóa không?"
                onConfirm={() => deleteFile(record)}
              >
                <DeleteOutlined style={{ fontSize: "20px", color: "red" }} />
              </Popconfirm>

              <Tooltip title="Download (*.pdf)">
                <Typography.Link
                  className="ml-4 flex"
                  onClick={() => download(record)}
                >
                  <DownloadOutlined
                    style={{ fontSize: "20px", color: "blue" }}
                  />
                </Typography.Link>
              </Tooltip>
            </Row>
          </>
        );
      },
    },
  ];

  const download = (file: IFile) => {
    try {
      if (file && file.name && file.transactionID) {
        const url = `https://www.meinvoice.vn/tra-cuu/tra-cuu/DownloadHandler.ashx?Type=pdf&Code=${file.transactionID}`;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${file.name.slice(0, file.name.length - 4)}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const upload = () => {
    const listFileSelect = files
      .filter((el) => el.id && selectedRowKeys.includes(el.id))
      .map((el) => el.transactionID);
    if (listFileSelect.length > 0) {
      axios({
        url: "http://localhost:3000/api/upload",
        method: "POST",
        data: listFileSelect,
      })
        .then((result) => {
          setFolderRandom(result.data);
          dowloadMultiFile();
          message.success("Upload file PDF success!");
        })
        .catch((err) => console.log("err", err));
    }
  };

  const dowloadMultiFile = () => {
    axios({
      method: "POST",
      url: "http://localhost:3000/api/download",
      data: {
        folderRandom,
      },
    })
      .then((res) => {
        console.log("link", `http://localhost:3000/zips/${res.data}.zip`);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const deleteFile = (file: IFile) => {
    dispatch(DeleteFile(file));
  };

  const deleteMultiFile = () => {
    const listFileSelect = files.filter(
      (el) => el.id && selectedRowKeys.includes(el.id)
    );
    if (listFileSelect.length > 0) {
      listFileSelect.forEach((el) => deleteFile(el));
      message.success("Delete all file success!");
    } else {
      message.info("List file empty!");
    }
  };

  const checkValidInvoice = () => {
    axios({
      url: "http://localhost:3000/api/transactionIDs",
      method: "POST",
      data: files,
    })
      .then((result) => {
        const resultFiles = result.data as IFile[];
        dispatch(SetFile(resultFiles));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <Row className="p-6">
        <Col className="mb-4" span={24}>
          <Row className="justify-between">
            <Row>
              <Upload
                customRequest={(options) => {
                  if (options.onSuccess) {
                    options.onSuccess("ok");
                  }
                }}
                onChange={(e) => handleUpload(e)}
                showUploadList={false}
                multiple={true}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              <Tooltip title="Reset dữ liệu">
                <Button
                  className="ml-4"
                  type="primary"
                  onClick={checkValidInvoice}
                >
                  Kiểm tra hợp lệ hóa đơn
                </Button>
              </Tooltip>
              <Tooltip title="Reset dữ liệu">
                <Button className="ml-4" type="primary" onClick={reset}>
                  Reset
                </Button>
              </Tooltip>
            </Row>
            <Row>
              <Button
                icon={<DownloadOutlined />}
                className="mr-4"
                onClick={upload}
              >
                Upload PDF
              </Button>
              <Button
                icon={<DownloadOutlined />}
                className="mr-4"
                onClick={dowloadMultiFile}
              >
                Download
              </Button>
              <Popconfirm
                onConfirm={deleteMultiFile}
                title="Bạn có muốn xoá tất cả file đã chọn"
              >
                <Button icon={<DeleteOutlined />}>Delete</Button>
              </Popconfirm>
            </Row>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={[...files]}
            rowKey={"id"}
            pagination={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default App;
