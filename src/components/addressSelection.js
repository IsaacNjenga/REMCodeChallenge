import React from "react";
import {  Card, Form, Input, Typography } from "antd";
//import { ArrowRightOutlined } from "@ant-design/icons";
const { Title } = Typography;

const labelStyle = {
  fontSize: "1rem",
  fontFamily: "Raleway",
  fontWeight: "600",
  color: "whitesmoke",
};
const inputStyle = {
  fontSize: "1rem",
  fontFamily: "Roboto",
  color: "whitesmoke",
  padding: "14px",
  lineHeight: "1.5px",
  background: "#1c1c1c",
  border: "1px solid #1c1c1c",
};
const titleStyle = {
  color: "white",
  fontSize: "2rem",
  margin: 0,
  fontFamily: "Raleway",
  letterSpacing: "1.2px",
};
// const buttonStyle = {
//   fontSize: "1rem",
//   padding: "14px 0px",
//   background: "#0037c0",
// };
const cardStyle = {
  width: "550px",
  margin: "20px auto",
  padding: 5,
  background: "rgba(0, 0, 0, 0)",
  borderColor: "rgba(0,0,0,0)",
};

function AddressSelection() {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log(values);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={cardStyle}>
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={titleStyle}>
            Please enter your details to continue
          </Title>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          style={{ margin: "10px 0px" }}
        >
          <Form.Item label={<span style={labelStyle}>City</span>} name="city">
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item
            label={<span style={labelStyle}>Street Name</span>}
            name="street_name"
          >
            <Input style={inputStyle} />
          </Form.Item>
          <Form.Item
            label={<span style={labelStyle}>House/Flat Number</span>}
            name="house_flat_number"
          >
            <Input style={inputStyle} />
          </Form.Item>
          {/* <Form.Item>
            <Button
              block
              iconPosition="end"
              icon={<ArrowRightOutlined />}
              type="primary"
              htmlType="submit"
              size="large"
              style={buttonStyle}
            >
              Continue
            </Button>
          </Form.Item> */}
        </Form>
      </Card>
    </div>
  );
}

export default AddressSelection;
