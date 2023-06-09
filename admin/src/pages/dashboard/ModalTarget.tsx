import { Avatar, Form, Image, Modal, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ITarget } from '../../interface/Target.interface';
import { selectUser } from '../../app/reducers/Auth/Auth.reducer';
import productPNG from '../../assets/images/product.png';

const { Text } = Typography;

interface IModalTargetProps {
  modalOpen: boolean;
  setModalOpen: (el: boolean) => void;
  target?: ITarget;
}

export default function ModalTarget(props: IModalTargetProps) {
  const { modalOpen, setModalOpen, target } = props;
  const currentUser = useAppSelector(selectUser);

  return (
    <>
      <Modal
        destroyOnClose={true}
        className="text-center"
        title={'Mục tiêu tháng 2 năm 2023'}
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
        forceRender>
        <Form className="flex flex-col justify-center items-center gap-10">
          <Avatar
            src={currentUser?.avatar ? currentUser.avatar : productPNG}
            className="w-[150px] rounded-[50%] h-[150px]"></Avatar>
          <Text className="text-[26px]">Tên thành viên : {currentUser?.name}</Text>
          <Text className="text-[26px]">Số ngày làm : 30</Text>
          <Text className="text-[26px]">Mục tiêu doanh thu : {target?.revenue}</Text>
        </Form>
      </Modal>
    </>
  );
}
