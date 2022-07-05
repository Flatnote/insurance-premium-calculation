import { Col, Row } from 'antd';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectCalculate } from '../features/calculator/calculatorSlice';

const Result = () => {
  const calculate = useAppSelector(selectCalculate);
  return (
    <div className="center app-container">
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
    </div>
  );
};

export default Result;
