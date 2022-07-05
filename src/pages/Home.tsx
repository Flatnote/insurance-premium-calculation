import { Button, Col, DatePicker, Form, Input, Radio, RadioChangeEvent, Row, Select } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { updateCalculatorValue } from '../features/calculator/calculatorSlice';
import { commonVariants } from '../utils/motion';

const apiHost = process.env.REACT_APP_API_HOST || 'http://localhost:5001';

const Home = () => {
  const dispatch = useAppDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const [calBy, setCalBy] = useState(1);
  const navigate = useNavigate();
  const doGetProduct = async (payload: any) => {
    setFormLoading(true);
    const response = await axios.post(`${apiHost}/getProduct`, payload);
    const product = response.data;
    setFormLoading(false);
    return product;
  };

  const onFinish = async (values: any) => {
    const product = await doGetProduct({ ...values, dob: values.dob.format('YYYY-MM-DD') });
    dispatch(updateCalculatorValue(product));
    navigate('/result');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (e: RadioChangeEvent) => {
    setCalBy(e.target.value);
  };
  return (
    <div className="center app-container">
      <motion.div initial="hidden" animate="visible" variants={commonVariants}>
        <Row gutter={[16, 16]} style={{ display: 'flex', justifyContent: 'center' }}>
          <Col span={20}>
            <h1 className="text-center">Insurance premium calculation</h1>
          </Col>
          <Col span={20}>
            <Radio.Group
              onChange={onChange}
              value={calBy}
              style={{ display: 'flex', justifyContent: 'center', margin: '0 0 1rem' }}
            >
              <Radio value={1}>Calculate premium by sum assured</Radio>
              <Radio value={2}>Calculate sum assured by premium</Radio>
            </Radio.Group>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="border rounded-border"
            >
              <Form.Item
                label="FirstName"
                name="firstName"
                rules={[{ required: true, message: 'Please input your firstName!' }]}
              >
                <Input placeholder="Your first name" />
              </Form.Item>
              <Form.Item
                label="LastName"
                name="lastName"
                rules={[{ required: true, message: 'Please input your lastName!' }]}
              >
                <Input placeholder="Your lastn name" />
              </Form.Item>
              <Form.Item label="Gender" name="genderCd">
                <Select placeholder="MALE, FEMALE">
                  <Select.Option value="MALE">MALE</Select.Option>
                  <Select.Option value="FEMALE">FEMALE</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{ required: true, message: 'Please input your date of birth!' }]}
              >
                <DatePicker
                  format="d/MM/YYYY"
                  style={{ width: '100%' }}
                  placeholder="Your birth date"
                />
              </Form.Item>
              <Form.Item
                label="Plan Code"
                name="planCode"
                rules={[{ required: true, message: 'Please select your plan code!' }]}
                initialValue="T11A20"
              >
                <Select>
                  <Select.Option value="T11A20">T11A20</Select.Option>
                  <Select.Option value="T11A50">T11A50</Select.Option>
                  <Select.Option value="T11AM1">T11AM1</Select.Option>
                </Select>
              </Form.Item>

              {calBy === 1 && (
                <Form.Item
                  label="Sum assured"
                  name="saPerYear"
                  rules={[{ required: true, message: 'Please fill your Sum assured!' }]}
                >
                  <Input type="number" placeholder="Sum assured number" />
                </Form.Item>
              )}

              {calBy === 2 && (
                <Form.Item
                  label="Premium"
                  name="premiumPerYear"
                  rules={[{ required: true, message: 'Please fill your Premium!' }]}
                >
                  <Input type="number" placeholder="Premium number" />
                </Form.Item>
              )}

              <Form.Item
                label="Payment Frequency"
                name="paymentFrequency"
                rules={[{ required: true, message: 'Please select your frequency payment!' }]}
                initialValue="YEARLY"
              >
                <Select>
                  <Select.Option value="YEARLY">YEARLY</Select.Option>
                  <Select.Option value="HALFYEARLY">HALFYEARLY</Select.Option>
                  <Select.Option value="QUARTERLY">QUARTERLY</Select.Option>
                  <Select.Option value="MONTHLY">MONTHLY</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item wrapperCol={{ md: { offset: 8, span: 16 }, sm: { offset: 0, span: 24 } }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={formLoading}
                  className="home-submit-btn"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default Home;
