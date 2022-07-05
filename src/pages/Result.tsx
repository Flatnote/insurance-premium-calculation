import { Col, Row, Tabs } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import ResultContent from '../components/ResultContent';
import { selectCalculate } from '../features/calculator/calculatorSlice';
import { containerVariant, itemVariant } from '../utils/motion';
import { capitalize } from '../utils/text';

const { TabPane } = Tabs;

const thisIsMobile = () => {
  if (window.innerWidth < 768) {
    return true;
  }
  return false;
};

const Result = () => {
  const calculate = useAppSelector(selectCalculate);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(thisIsMobile());

  useEffect(() => {
    if (Object.keys(calculate).length === 0) {
      navigate('/', { replace: true });
    }

    const handleResize = () => {
      setIsMobile(thisIsMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="center app-container">
      <motion.div initial="hidden" animate="visible" variants={containerVariant}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <motion.h1 style={{ textAlign: 'center' }} variants={itemVariant}>
              Product Result
            </motion.h1>
          </Col>
          <Col
            span={24}
            style={{
              maxWidth: '80%',
              margin: '0 auto'
            }}
          >
            <motion.div
              variants={itemVariant}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              {Object.keys(calculate).length > 0 && (
                <Tabs
                  defaultActiveKey={capitalize(Object.keys(calculate)[0])}
                  tabPosition={isMobile ? 'left' : 'top'}
                >
                  {Object.keys(calculate).map((key: string) => (
                    <TabPane tab={capitalize(key)} key={key}>
                      <ResultContent data={calculate[key as keyof typeof calculate]} />
                    </TabPane>
                  ))}
                </Tabs>
              )}
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default Result;
