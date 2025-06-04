import React, { useEffect } from "react";
import { Card, Form, Input, Typography } from "antd";
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
  margin: "10px auto",
  padding: 5,
  background: "rgba(0, 0, 0, 0)",
  borderColor: "rgba(0,0,0,0)",
};

function AddressSelection({form}) {

  useEffect(() => {
    const existing = form.getFieldValue("postcodeDetails");
    if (!existing || existing.length === 0) {
      form.setFieldsValue({
        postcodeDetails: [{}],
      });
    }
  }, [form]);

  return (
    <div
      style={{
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
        <Form.List name="postcodeDetails">
          {(fields) =>
            fields.map(({ key, name }) => (
              <div key={key}>
                <Form.Item
                  name={[name, "city"]}
                  label={<span style={labelStyle}>City</span>}
                >
                  <Input style={inputStyle} />
                </Form.Item>
                <Form.Item
                  name={[name, "street_name"]}
                  label={<span style={labelStyle}>Street Name</span>}
                >
                  <Input style={inputStyle} />
                </Form.Item>
                <Form.Item
                  name={[name, "house_flat_number"]}
                  label={<span style={labelStyle}>House/Flat Number</span>}
                >
                  <Input style={inputStyle} />
                </Form.Item>
              </div>
            ))
          }

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
        </Form.List>
      </Card>
    </div>
  );
}

export default AddressSelection;
