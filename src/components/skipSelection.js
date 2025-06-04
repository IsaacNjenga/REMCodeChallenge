import React, { useState } from "react";
import {
  Badge,
  Card,
  Carousel,
  Col,
  Row,
  Typography,
  Image,
  Button,
  Tag,
} from "antd";
import {
  CheckCircleTwoTone,
  ClockCircleOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { skipData } from "../assets/data/data";
import ModalPage from "./modalPage";

const { Title, Text } = Typography;

const titleStyle = {
  color: "white",
  fontSize: "2rem",
  margin: 0,
  fontFamily: "Raleway",
  letterSpacing: "1.2px",
};

const buttonStyle = {
  fontSize: "1.1rem",
  background: "#0037c0",
};

function SkipSelection({ next, form }) {
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const calculatePriceWithVAT = (basePrice, vatPercentage) => {
    if (!basePrice || !vatPercentage) return basePrice;
    const vatAmount = (basePrice * vatPercentage) / 100;
    return Math.ceil(basePrice + vatAmount);
  };

  const priceAfterVat = (item) =>
    calculatePriceWithVAT(item.price_before_vat, item.vat);

  const handleClick = (item) => {
    setLoading(true);
    setModalContent(item);
    setOpenModal(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",

        padding: 20,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Title level={3} style={titleStyle}>
          Choose your skip size
        </Title>
      </div>
      <div style={{ margin: 10, textAlign: "center" }}>
        <Title level={4} style={{ color: "white" }}>
          Select the skip size that best suits your needs
        </Title>
      </div>
      <div>
        <Row gutter={[10, 10]} justify="center">
          {skipData.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{
                  background:
                    "linear-gradient(to right, #fff0f0 0%, #f0efef 100%)",
                  border: "1px solid rgba(0,0,0,0)",
                }}
                cover={
                  <Badge.Ribbon
                    text={`${item.size} yards`}
                    color="#003dbc"
                    style={{
                      display: "block",
                      right: "10px",
                      fontFamily: "Roboto",
                      fontSize: "1rem",
                      padding: 5,
                    }}
                  >
                    <Carousel autoplay autoplaySpeed={4500} fade dots={false}>
                      {Array.isArray(item.img) && item.img.length > 0 ? (
                        item.img.map((imgSrc, index) => (
                          <div key={index}>
                            <Image
                              alt={`Slide ${index + 1}`}
                              src={imgSrc}
                              width="100%"
                              height={250}
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <Image
                          alt={item.size}
                          src={item.img}
                          width="100%"
                          height={350}
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </Carousel>
                  </Badge.Ribbon>
                }
              >
                <div
                  style={{
                    marginBottom: 8,
                    borderRadius: 10,
                  }}
                >
                  <Row gutter={16} align="left" justify="space-between">
                    <Col>
                      <Title
                        level={3}
                        style={{
                          margin: 0,
                          fontFamily: "Raleway",
                        }}
                      >
                        {item.size} Yard Skip
                      </Title>
                      <Text
                        type="secondary"
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "1.2rem",
                        }}
                      >
                        <ClockCircleOutlined style={{ fontSize: "1rem" }} />{" "}
                        {item.hire_period_days} day hire
                      </Text>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Title
                        level={2}
                        style={{
                          margin: 0,
                          fontFamily: "Raleway",
                          color: "green",
                        }}
                      >
                        £{priceAfterVat(item)}
                      </Title>
                      <Text type="secondary">
                        (£{item.price_before_vat} + {item.vat}%)
                      </Text>
                    </Col>
                  </Row>

                  <div style={{ marginTop: 2 }}>
                    <Tag
                      icon={
                        item.allowed_on_road ? (
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        ) : (
                          <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                        )
                      }
                      color={item.allowed_on_road ? "success" : "error"}
                      style={{ fontSize: "0.8rem", fontFamily: "Roboto" }}
                    >
                      {item.allowed_on_road
                        ? "Allowed On The Road"
                        : "Not Allowed on the Road"}
                    </Tag>
                  </div>

                  <div style={{ marginTop: 16, textAlign: "right" }}>
                    <Button
                      type="primary"
                      shape="round"
                      block
                      style={buttonStyle}
                      onClick={() => handleClick(item)}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <ModalPage
        openModal={openModal}
        setOpenModal={setOpenModal}
        loading={loading}
        modalContent={modalContent}
        buttonStyle={buttonStyle}
        priceAfterVat={priceAfterVat}
        next={next}
        form={form}
      />
    </div>
  );
}

export default SkipSelection;
