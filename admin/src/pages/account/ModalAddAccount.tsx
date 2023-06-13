import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, message, Modal, Row, Select, Typography, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { ContainerAPI } from '../../apis/container.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import productPNG from '../../assets/images/product.png';
import { GetFile } from '../../helper/getFile.helper';
import './index.css';
import { IAccount } from '../../interface/Account.interface';

const { Text } = Typography;

const { Option } = Select;

interface IModalAddAccountProps {
  modalOpen: boolean;
  setModalOpen: (el: boolean) => void;
  account?: IAccount;
}

interface IFormValue {
  username?: string;
  name?: string;
  password?: string;
  confirm?: string;
  avatar?: string;
  teamId?: number;
}
export default function ModalAddAccount(props: IModalAddAccountProps) {
  const { modalOpen, setModalOpen, account } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState<IFormValue>({
    username: account?.username,
    name: account?.name,
    password: account?.password,
    confirm: account?.password,
    teamId: account?.teamId,
    avatar: account?.avatar,
  });

  // useEffect(() => {
  //   CategoryBlogAPI.fetchAll()
  //     .then((result) => {
  //       dispatch(SetCategoryBlog(result.data));
  //     })
  //     .catch((err) => console.log('err', err));
  // }, [dispatch]);
  useEffect(() => {
    setFormValue((fValues) => ({
      // ...fValues,
      // title: blog?.title,
      // metaDescription: blog?.metaDescription,
      // content: blog?.content,
      // photoURL: blog?.photoURL,
      // categoryBlogId: blog?.categoryBlogId ? blog.categoryBlogId : categoryBlog[0]?.id,
    }));

    form.setFieldsValue({
      ...form.getFieldsValue(),
      username: account?.username,
      name: account?.name,
      password: account?.password,
      confirm: account?.password,
      avatar: account?.avatar,
    });
  }, [account, form]);

  const onValuesChange = () => {
    const getFieldsValue = form.getFieldsValue();

    setFormValue(getFieldsValue);
  };

  const onFinish = () => {
    // call api
    // AccountAPI.put(account?.id ? { ...formValue, id: account.id } : formValue)
    //   .then((result) => {
    //     dispatch(PutBlog(result.data));
    //     message.success('Success!');
    //     setModalOpen(false);
    //   })
    //   .catch((err) => {
    //     message.error('Error', err);
    //   });
  };

  const onFinishFailed = () => {
    message.error('Error!');
  };

  const beforeUpload = (file: RcFile) => {
    // Access file content here and do something with it
    ContainerAPI.upload(file as File).then((result) => {
      const photoURL = GetFile(result.data);
      setFormValue((f) => ({ ...f, photoURL }));
    });
    // Prevent upload
    return false;
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        title={'Thêm Account'}
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
        forceRender>
        <Form
          form={form}
          initialValues={formValue}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          colon={false}
          autoComplete="off">
          <Text>Username</Text>
          <Form.Item
            name="username"
            required
            label="">
            <Input />
          </Form.Item>
          <Text>Password</Text>
          <Form.Item
            name="password"
            required
            label="">
            <Input.Password />
          </Form.Item>
          <Text>Confirm</Text>
          <Form.Item
            name="confirm"
            required
            label="">
            <Input.Password />
          </Form.Item>
          <Text>Name</Text>
          <Form.Item
            name="name"
            required
            label="">
            <Input />
          </Form.Item>
          <Text>Phone</Text>
          <Form.Item
            name="phone"
            required
            label="">
            <Input />
          </Form.Item>
          <Text>Team</Text>
          <Form.Item
            name="teamId"
            required
            label="">
            <Select style={{ width: 180 }}>
              {/* {categoryBlog.length > 0 &&
                categoryBlog.map((el: ICategoryBlog, index: number) => {
                  return (
                    <Option
                      key={index}
                      value={el.id}>
                      {el.title} {el.id}
                    </Option>
                  );
                })} */}
            </Select>
          </Form.Item>
          <Text>Image</Text>
          <Row>
            <Image
              src={formValue?.avatar ? formValue.avatar : productPNG}
              height={150}
            />
            <Upload
              beforeUpload={beforeUpload}
              customRequest={(options) => {
                if (options.onSuccess) {
                  options.onSuccess('ok');
                }
              }}
              maxCount={1}
              showUploadList={false}
              className="cursor-pointer ml-4">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Row>
          <Text>Content</Text>
          <Row className="justify-end">
            <Button
              className="mr-4"
              onClick={() => setModalOpen(false)}>
              Đóng
            </Button>
            <Button
              type="primary"
              htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
