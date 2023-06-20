import { PlusOutlined, DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row, Tooltip, Typography, Form } from 'antd';
import { useEffect, useState } from 'react';
import { TeamAPI } from '../../apis/team.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ModalTeam from '../../components/team/ModalTeam';
import { ITeam } from '../../interface/Team.interface';
import { IAccount } from '../../interface/Account.interface';
import { AccountAPI } from '../../apis/account.api';
import { DeleteTeam, GetTeam, SetTeam, UpdateTeam } from '../../app/reducers/Team/Team.reducer';
import './index.css';

const { Title, Text } = Typography;

export default function Team() {
  const dataTeam = useAppSelector(GetTeam);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [accountDrag, setAccountDrag] = useState<IAccount>({});
  const [teamDrag, setTeamDrag] = useState<ITeam>({});
  const [dataModal, setDataModal] = useState<ITeam>({});
  const [editing, setEditing] = useState<boolean>(false);
  const widthWidget = (1 / (dataTeam.length + 1)) * 100;

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [dispatch]);

  const search = async () => {
    await TeamAPI.fetchAllMembers().then(async (resTeam) => {
      await AccountAPI.fetchWhereTeam(0).then((res) => {
        const emptyTeam: ITeam = { name: 'Chưa vào team', id: 0, members: res.data.data };
        dispatch(SetTeam([emptyTeam, ...resTeam.data]));
      });
    });
  };

  const handleOnDrag = (e: React.DragEvent, account: IAccount, team: ITeam) => {
    setAccountDrag(account);
    setTeamDrag(team);
  };

  const handleOnDrop = async (e: React.DragEvent, team: ITeam) => {
    const updateAccount: IAccount = { ...accountDrag, teamId: team ? team.id : 0 };
    if (accountDrag.id && team.id !== teamDrag.id) {
      await AccountAPI.update(accountDrag.id, updateAccount).then(() => {
        dispatch(
          UpdateTeam({
            ...teamDrag,
            leaderId: teamDrag.leaderId === accountDrag.id ? 0 : teamDrag.leaderId,
            members: teamDrag.members?.filter((el) => el.id !== accountDrag.id),
          })
        );
        if (team.members) dispatch(UpdateTeam({ ...team, members: [...team.members, updateAccount] }));
      });
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const remove = async (record: Partial<ITeam>) => {
    const emptyTeam = dataTeam[0];
    if (record.id) {
      const memberOfTeam = record.members;
      memberOfTeam?.map(async (el) => {
        if (el.id) {
          await AccountAPI.update(el.id, { ...el, teamId: 0 }).then((res) => {
            if (emptyTeam.members) dispatch(UpdateTeam({ ...emptyTeam, members: [...emptyTeam.members, res.data] }));
          });
        }
      });
      await TeamAPI.delete(record.id).then(() => {
        dispatch(DeleteTeam(record));
      });
    }
  };
  return (
    <>
      {showModal && (
        <ModalTeam
          modalOpen={showModal}
          setModalOpen={setShowModal}
          team={dataModal}
        />
      )}
      <Row>
        <Title level={3}>Nhóm</Title>
      </Row>
      <Row className="flex justify-between">
        <Button
          type="primary"
          disabled={!editing}
          icon={<PlusOutlined />}
          className="mb-4"
          onClick={() => {
            setDataModal({});
            setShowModal(true);
          }}></Button>
        {!editing ? (
          <Button
            type="primary"
            className="mb-4"
            onClick={() => setEditing(true)}>
            Chỉnh sửa
          </Button>
        ) : (
          <Row>
            <Button
              type="primary"
              icon={<CheckOutlined style={{ fontSize: '130%' }} />}
              onClick={() => setEditing(false)}></Button>
          </Row>
        )}
      </Row>

      <div className="flex flex-row-reverse justify-between">
        {dataTeam.length > 0 &&
          dataTeam.map((el: ITeam, index) => {
            return (
              <Form
                disabled={!editing}
                className="boxs rounded-lg bg-[#dcd5d5] overflow-hidden p-2 "
                style={!editing ? { width: `${widthWidget}%`, opacity: 0.7 } : { width: `${widthWidget}%` }}
                key={index}
                onDrop={(e) => {
                  if (editing) handleOnDrop(e, el);
                }}
                onDragOver={(e) => handleDragOver(e)}>
                <div className="w-full h-[60px]  text-[15px] font-bold flex justify-between uppercase items-center gap-2">
                  <Text className="flex items-center justify-between max-w-[130px]">
                    <div
                      className=""
                      title={el.name}>
                      {el.name}
                    </div>
                    <span className="ml-2 leading-[5px] p-2 rounded-[50%] bg-white">{el.members?.length}</span>
                  </Text>
                  {index > 0 && (
                    <Row>
                      <Tooltip title="Sửa">
                        <Typography.Link
                          disabled={!editing}
                          className="mr-4"
                          onClick={() => {
                            setDataModal(el);
                            setShowModal(true);
                          }}>
                          <EditOutlined style={{ fontSize: '130%', color: 'black' }} />
                        </Typography.Link>
                      </Tooltip>
                      <Popconfirm
                        title="Bạn có chắc chắn muốn xóa không?"
                        onConfirm={() => {
                          remove(el);
                        }}>
                        <Typography.Link disabled={!editing}>
                          <DeleteOutlined style={{ fontSize: '130%', color: 'black' }} />
                        </Typography.Link>
                      </Popconfirm>
                    </Row>
                  )}
                </div>
                <div className="widgets h-[400px] w-full flex justify-start items-center flex-col gap-2">
                  {el.members?.map((mem, index) => {
                    return (
                      <div
                        className="text-[20px] rounded-[5px] bg-white h-10 min-h-10 flex flex-col justify-center items-start px-4 w-full"
                        key={index}
                        draggable={editing}
                        onDragStart={(e) => handleOnDrag(e, mem, el)}>
                        <p className="text-[15px]">
                          {mem.name} {mem.id === el.leaderId ? '(Leader)' : ''}
                        </p>
                        <p className="text-[10px]">{mem.email}</p>
                      </div>
                    );
                  })}
                </div>
              </Form>
            );
          })}
      </div>
    </>
  );
}
