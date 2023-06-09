import { Row } from 'antd';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import DashboardOrderByAmount from '../../components/dashboard/DashboardOrderByAmount';
import DashboardOrderByRevenue from '../../components/dashboard/DashboardOrderByRevenue';
import ModalTarget from './ModalTarget';
import { ITarget } from '../../interface/Target.interface';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [data, setData] = useState<ITarget[]>([]);
  const [showModal, setShowModal] = useState<boolean>(true);

  useEffect(() => {
    search();
  }, [data]);
  const search = async () => {
    await axios.get('http://14.225.192.139:3000/api/Targets').then((result) => {
      setData(result.data);
    });
  };

  return (
    <Row className="h-1/2">
      {showModal && (
        <ModalTarget
          modalOpen={showModal}
          setModalOpen={setShowModal}
          target={data[0]}
        />
      )}
      <DashboardOrderByAmount />
      <DashboardOrderByRevenue />
    </Row>
  );
}
