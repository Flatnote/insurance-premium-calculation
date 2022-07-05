import { Col, Row } from 'antd';
import { motion } from 'framer-motion';
import { useAppSelector } from '../app/hooks';
import { selectCalculate } from '../features/calculator/calculatorSlice';
import { commonVariants } from '../utils/motion';

const Result = () => {
  const calculate = useAppSelector(selectCalculate);
  return (
    <div className="center app-container">
      <motion.div initial="hidden" animate="visible" variants={commonVariants}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h1 style={{ textAlign: 'center' }}>Product Result</h1>
          </Col>
          <Col span={24}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {JSON.stringify(calculate)}
            </div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default Result;
