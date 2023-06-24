import { Button, Form, Input, message, Modal, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { AccountAPI } from '../../apis/account.api';
import { TeamAPI } from '../../apis/team.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GetTeam, PutTeam, UpdateTeam } from '../../app/reducers/Team/Team.reducer';
import { IAccount } from '../../interface/Account.interface';
import { ITeam } from '../../interface/Team.interface';

const { Text } = Typography;

const { Option } = Select;

interface IModalTeam {
  modalOpen: boolean;
  setModalOpen: (el: boolean) => void;
  team?: ITeam;
}

interface IFormValue {
  name?: string;
  leaderId?: number;
}
export default function ModalTeam(props: IModalTeam) {
  const { modalOpen, setModalOpen, team } = props;
  const [form] = Form.useForm();
  const emptyTeam = useAppSelector(GetTeam)[0];
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState<IFormValue>({
    name: team?.name,
    leaderId: team?.leaderId,
  });
  const [userInfo, setUserInfo] = useState<IAccount[]>([]);
  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [dispatch]);
  const search = async () => {
    await AccountAPI.fetchWhereTeam(team?.id ? team.id : 0).then((res) => setUserInfo(res.data.data));
  };
  useEffect(() => {
    setFormValue((fValues) => ({
      ...fValues,
      name: team?.name,
      leaderId: team?.leaderId,
    }));

    form.setFieldsValue({
      ...form.getFieldsValue(),
      name: team?.name,
      leaderId: team?.leaderId,
    });
  }, [team, form]);

  const onValuesChange = () => {
    const getFieldsValue = form.getFieldsValue();
    setFormValue(getFieldsValue);
  };

  const onFinish = () => {
    TeamAPI.put(team?.id ? { ...formValue, id: team.id } : formValue)
      .then(async (result) => {
        const infoLeader = await AccountAPI.getAccountById(result.data.leaderId).then((res) => res.data);
        AccountAPI.update(result.data.leaderId, { ...infoLeader, teamId: result.data.id }).then((res) => {
          dispatch(UpdateTeam({ ...emptyTeam, members: emptyTeam.members?.filter((el) => el.id !== res.data.id) }));
        });
        dispatch(PutTeam({ ...result.data, members: team?.members ? [...team.members] : [{ ...infoLeader, teamId: result.data.id }] }));
        message.success('Success!');
        setModalOpen(false);
      })
      .catch((err) => {
        message.error('Error', err);
      });
  };
  const onFinishFailed = () => {
    message.error('Error!');
  };
  return (
    <>
      <Modal
        destroyOnClose={true}
        title={team?.id ? 'Cập nhật Team' : 'Thêm Team'}
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
          <Text>Tên Team</Text>
          <Form.Item
            name="name"
            required
            label="">
            <Input />
          </Form.Item>
          <Text>Leader</Text>
          <Form.Item
            name="leaderId"
            required
            label="">
            <Select style={{ width: 180 }}>
              {userInfo.length > 0 &&
                userInfo.map((el: IAccount, index: number) => {
                  return (
                    <Option
                      key={index}
                      value={el.id}>
                      {el.name}-{el.username}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
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
