import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { AccountAPI } from "../../apis/account.api";
import { TeamAPI } from "../../apis/team.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  GetTeam,
  PutTeam,
  UpdateTeam,
} from "../../app/reducers/Team/Team.reducer";
import { IAccount } from "../../interface/Account.interface";
import { ITeam } from "../../interface/Team.interface";
import { SetTarget } from "../../app/reducers/Target/Target.reducer";

const { Text } = Typography;

const { Option } = Select;

interface IModalTeam {
  modalOpen: boolean;
  setModalOpen: (el: boolean) => void;
  team?: ITeam;
}

interface IFormValue {
  name?: string;
  leaderId?: number | null;
}
export default function ModalTeam(props: IModalTeam) {
  const { modalOpen, setModalOpen, team } = props;
  const [form] = Form.useForm();
  const emptyTeam = useAppSelector(GetTeam)[0];
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<IAccount[]>([]);
  useEffect(() => {
    dispatch(SetTarget(false));
    search();
    // eslint-disable-next-line
  }, [dispatch]);
  const search = async () => {
    if (team?.id) {
      await AccountAPI.fetchWhereTeam(team.id).then((res) =>
        setUserInfo(res.data)
      );
    } else {
      await AccountAPI.fetchWhereNoTeam().then((res) => setUserInfo(res.data));
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      name: team?.name,
      leaderId: team?.leaderId,
    });
  }, [team, form]);

  const onFinish = (fValue: IFormValue) => {
    if (fValue.leaderId === undefined) {
      fValue.leaderId = null;
    }
    TeamAPI.put(team?.id ? { ...fValue, id: team.id } : fValue)
      .then(async (result) => {
        if (result.data.leaderId !== null) {
          const infoLeader = await AccountAPI.getAccountById(
            result.data.leaderId
          ).then((res) => res.data);
          AccountAPI.update(result.data.leaderId, {
            ...infoLeader,
            teamId: result.data.id,
          }).then((res) => {
            dispatch(
              UpdateTeam({
                ...emptyTeam,
                members: emptyTeam.members?.filter(
                  (el) => el.id !== res.data.id
                ),
              })
            );
          });

          dispatch(
            PutTeam({
              ...result.data,
              members: team?.members
                ? [...team.members]
                : [{ ...infoLeader, teamId: result.data.id }],
            })
          );
        } else {
          dispatch(PutTeam({ ...result.data, members: [] }));
        }

        message.success("Success!");
        setModalOpen(false);
      })
      .catch((err) => {
        message.error("Error", err);
      });
  };
  const onFinishFailed = () => {
    message.error("Error!");
  };
  return (
    <>
      <Modal
        destroyOnClose={true}
        title={
          team?.id ? (
            <Typography.Text>Cập nhật Team</Typography.Text>
          ) : (
            <Typography.Text>Thêm Team</Typography.Text>
          )
        }
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
        forceRender
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          colon={false}
          autoComplete="off"
        >
          <Text>Tên Team</Text>
          <Form.Item name="name" required label="">
            <Input />
          </Form.Item>
          <Text>Leader</Text>
          <Form.Item name="leaderId" required label="">
            <Select>
              {userInfo.length > 0 &&
                userInfo.map((el: IAccount, index: number) => {
                  return (
                    <Option key={index} value={el.id}>
                      {el.name}-{el.email}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Row className="justify-end">
            <Button className="mr-4" onClick={() => setModalOpen(false)}>
              Đóng
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
