import { Card, Col, Row } from 'antd';
import React from 'react';
import { capitalize } from '../utils/text';

const ResultContent = ({ data }: { data: object[] }) => {
  const filteredData = data.filter((item) => Object.keys(item).length > 0);
  return (
    <Row gutter={[16, 16]}>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => {
          const keyItems = Object.keys(item);
          return (
            <React.Fragment key={`benefit-${index}`}>
              {keyItems.map((key, subindex) => {
                return (
                  <React.Fragment key={`sub-benefit-${index}-${subindex}`}>
                    <Col md={{ span: 8 }} span={18} className="result-col">
                      <Card
                        title={
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {capitalize(key)}
                          </div>
                        }
                        bordered={false}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          {item[key as keyof object]}
                        </div>
                      </Card>
                    </Col>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })
      ) : (
        <Col span={24} className="center" style={{ minHeight: '10vh', width: '100%' }}>
          Empty Data
        </Col>
      )}
    </Row>
  );
};

export default ResultContent;
