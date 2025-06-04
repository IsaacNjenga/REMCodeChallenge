import React, { useEffect, useState } from "react";
import { Card, Col, Form, Checkbox, Row, Typography, Alert } from "antd";
import {
  AppstoreAddOutlined,
  BankOutlined,
  HomeOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

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
const iconStyle = {
  fontSize: "2rem",
  padding: "8px",
  border: "1px solid grey",
  borderRadius: "50%",
};
const cardStyle = {
  width: "650px",
  margin: "20px auto",
  padding: 5,
  background: "rgba(0, 0, 0, 0)",
  borderColor: "rgba(0,0,0,0)",
};

const cardForm = [
  {
    key: 1,
    title: "Construction Waste",
    text: "Building materials and renovation debris",
    icon: <AppstoreAddOutlined style={iconStyle} />,
  },
  {
    key: 2,
    title: "Household Waste",
    text: "General household items and furniture",
    icon: <HomeOutlined style={iconStyle} />,
  },
  {
    key: 3,
    title: "Garden Waste",
    text: "Green waste and landscaping materials",
    icon: <ShopOutlined style={iconStyle} />,
  },
  {
    key: 4,
    title: "Commercial Waste",
    text: "Business and office clearance",
    icon: <BankOutlined style={iconStyle} />,
  },
];
function WasteSelection({form}) {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSelect = (title) => {
    let updated = selectedServices.includes(title)
      ? selectedServices.filter((item) => item !== title)
      : [...selectedServices, title];

    setSelectedServices(updated);

    form.setFieldsValue({
      wasteSelection: [{ types: updated }],
    });
  };

  useEffect(() => {
    const existing = form.getFieldValue("wasteSelection");
    if (!existing || existing.length === 0) {
      form.setFieldsValue({
        wasteSelection: [{ types: [] }],
      });
    }
  }, [form]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Card style={cardStyle}>
        <div style={{ textAlign: "center" }}>
          <Title level={3} style={titleStyle}>
            What type of waste are you disposing of?
          </Title>
        </div>
        <div style={{ margin: 10 }}>
          <Alert
            message={
              <span style={{ fontFamily: "Raleway" }}>
                Select all that apply
              </span>
            }
            type="info"
            showIcon
          />
        </div>
        <Form.List name="wasteSelection">
          {(fields) =>
            fields.map(({ key, name }) => (
              <Row gutter={[20, 20]} key={key}>
                {cardForm.map((card) => (
                  <Col xs={24} sm={12} key={card.key}>
                    <Card
                      onClick={() => handleSelect(card.title)}
                      style={{
                        cursor: "pointer",
                        backgroundColor: selectedServices.includes(card.title)
                          ? "#333"
                          : "#141414",
                        color: "white",
                        border: "1px solid #333",
                        marginBottom: 15,
                      }}
                      bodyStyle={{ display: "flex", alignItems: "center" }}
                    >
                      <div style={{ marginRight: "10px" }}>{card.icon}</div>
                      <div style={{ flex: 1 }}>
                        <Title
                          level={5}
                          style={{
                            margin: 0,
                            color: "white",
                            fontFamily: "Raleway",
                          }}
                        >
                          {card.title}
                        </Title>
                        <p
                          style={{
                            color: "lightgrey",
                            margin: 0,
                            fontFamily: "Roboto",
                          }}
                        >
                          {card.text}
                        </p>
                      </div>
                      <Checkbox
                        checked={selectedServices.includes(card.title)}
                        onChange={() => handleSelect(card.title)}
                        style={{ pointerEvents: "none" }}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            ))
          }
        </Form.List>
      </Card>
    </div>
  );
}

export default WasteSelection;
