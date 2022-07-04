import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select
} from 'antd';
import axios from 'axios';
import { useState } from 'react';

const apiHost = process.env.REACT_APP_API_HOST || 'http://localhost:5001';

const App = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [calBy, setCalBy] = useState(1);
  const doGetProduct = async (payload: any) => {
    setFormLoading(true);
    const response = await axios.post(`${apiHost}/getProduct`, payload);
    const product = response.data;
    setFormLoading(false);
    return product;
  };

  const onFinish = async (values: any) => {
    const product = await doGetProduct({ ...values, dob: values.dob.format('YYYY-MM-DD') });
    Modal.success({
      content: JSON.stringify(product)
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (e: RadioChangeEvent) => {
    setCalBy(e.target.value);
  };

  return (
    <div className="center app-container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1 className="text-center">Insurance premium calculation</h1>
        </Col>
        <Col span={24}>
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
              <Input />
            </Form.Item>
            <Form.Item
              label="LastName"
              name="lastName"
              rules={[{ required: true, message: 'Please input your lastName!' }]}
            >
              <Input />
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
              <DatePicker format="d/MM/YYYY" style={{ width: '100%' }} />
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
                <Input type="number" />
              </Form.Item>
            )}

            {calBy === 2 && (
              <Form.Item
                label="Premium"
                name="premiumPerYear"
                rules={[{ required: true, message: 'Please fill your Premium!' }]}
              >
                <Input type="number" />
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={formLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default App;
