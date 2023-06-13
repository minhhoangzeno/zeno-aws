import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { TeamAPI } from '../../apis/team.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ModalTeam from '../../components/team/ModalTeam';
import { ITeam } from '../../interface/Team.interface';
import { IAccount } from '../../interface/Account.interface';
import { AccountAPI } from '../../apis/account.api';
import { GetTeam, SetTeam } from '../../app/reducers/Team/Team.reducer';

const { Title } = Typography;

export default function Team() {
  const team = useAppSelector(GetTeam);
  const dispatch = useAppDispatch();
  const [noteam, setNoTeam] = useState<IAccount[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataTeam, setDataTeam] = useState<IAccount>({});

  useEffect(() => {
    search();
  }, [dispatch]);

  const search = async () => {
    await TeamAPI.fetchAllMembers().then((res) => {
      dispatch(SetTeam(res.data));
    });
    await AccountAPI.fetchWhereNoTeam().then((res) => setNoTeam(res.data.data));
  };
  const handleOnDrag = (e: React.DragEvent, number: number, data: IAccount) => {
    setDataTeam(data);
  };
  const handleOnDrop = async (e: React.DragEvent, id?: number) => {
    const dataUpdate = { ...dataTeam, teamId: id };
    if (dataTeam.id) {
      await AccountAPI.update(dataTeam.id, dataUpdate).then((res) => {
        search();
      });
    }
  };
  const handleDragOver = (e: React.DragEvent, number: number) => {
    e.preventDefault();
  };
  return (
    <>
      {showModal && (
        <ModalTeam
          modalOpen={showModal}
          setModalOpen={setShowModal}
        />
      )}
      <Row>
        <Title level={3}>Nhóm</Title>
      </Row>
      <Row>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="mb-4"
          onClick={() => setShowModal(true)}></Button>
      </Row>
      <div className="flex flex-wrap gap-20 justify-center">
        {team.length > 0 &&
          team.map((el: ITeam, index) => {
            return (
              <div
                className="border-solid border-2 border-black w-1/3"
                key={index}
                onDrop={(e) => handleOnDrop(e, el.id)}
                onDragOver={(e) => handleDragOver(e, index)}>
                <p className="w-full border-b-black border-solid border-0 h-10 border-b-2 text-[30px] flex justify-center items-center gap-2">
                  {el.name}{' '}
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}></Button>
                  <Button
                    type="primary"
                    icon={<EditOutlined />}></Button>
                </p>
                <div className="widgets h-[300px] p-2 w-full flex justify-start items-center flex-col overflow-y-auto gap-4">
                  {el.members?.map((mem, index) => {
                    return (
                      <div
                        className="widget text-[20px] rounded-[5px] bg-cyan-300 h-10 text-center w-full"
                        key={index}
                        draggable
                        onDragStart={(e) => handleOnDrag(e, index, mem)}>
                        {mem.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        <div
          className="border-solid border-2 border-black w-1/3"
          key={0}
          onDrop={(e) => handleOnDrop(e, 0)}
          onDragOver={(e) => handleDragOver(e, 0)}>
          <p className="w-full border-b-black border-solid border-0 h-10 border-b-2 text-[30px]">Chưa vào Team</p>
          <div className="widgets h-[300px] p-2 w-full flex justify-start items-center flex-col overflow-y-auto gap-4">
            {noteam?.map((mem, index) => {
              return (
                <div
                  className="widget text-[20px] rounded-[5px] bg-cyan-300 h-10 text-center w-full"
                  key={index}
                  draggable
                  onDragStart={(e) => handleOnDrag(e, index, mem)}>
                  {mem.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
