import { Row } from 'antd';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import './index.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  
  return (
    <Row className="h-1/2">
      
    </Row>
  );
}
