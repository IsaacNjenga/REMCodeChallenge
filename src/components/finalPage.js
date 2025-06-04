import {
  Card,
  Form,
  Row,
  Col,
  Carousel,
  Divider,
  Typography,
  Tag,
  Image,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  ClockCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function FinalPage() {
  const form = Form.useFormInstance();
  const values = form.getFieldsValue();
  const [skipValues, setSkipValues] = useState(null);

  useEffect(() => {
    if (values) {
      setSkipValues(values.skipSelection);
    }
  }, []);
  const calculatePriceWithVAT = (basePrice, vatPercentage) => {
    if (!basePrice || !vatPercentage) return basePrice;
    const vatAmount = (basePrice * vatPercentage) / 100;
    return Math.ceil(basePrice + vatAmount);
  };

  const priceAfterVat = (item) =>
    calculatePriceWithVAT(item.price_before_vat, item.vat);

  return (
    <div>
      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
          padding: 10,
          margin: 5,
        }}
      >
        <Row gutter={[24, 24]}>
          {/* Left: Carousel */}
          <Col xs={24} md={10}>
            <Carousel autoplay autoplaySpeed={4500} dots>
              {(skipValues?.img?.length > 0
                ? skipValues.img
                : [skipValues?.img]
              ).map((src, index) => (
                <div key={index}>
                  <Image
                    alt={`Slide ${index + 1}`}
                    src={src}
                    width="100%"
                    height={300}
                    style={{
                      borderRadius: "10px",
                      objectFit: "cover",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>

          {/* Right: Details */}
          <Col xs={24} md={14}>
            <Title level={3} style={{ marginBottom: 0, fontFamily: "Raleway" }}>
              {skipValues?.size} Yard Skip
            </Title>

            <Text type="secondary">
              <ClockCircleOutlined /> {skipValues?.hire_period_days}-day hire
            </Text>

            <Divider style={{ margin: "12px 0" }} />

            <Row justify="space-between" align="middle">
              <Col>
                <Text type="secondary">Base Price:</Text>
                <br />
                <Text strong>£{skipValues?.price_before_vat}</Text>
              </Col>
              <Col>
                <Text type="secondary">VAT ({skipValues?.vat}%)</Text>
                <br />
                <Text strong>
                  £
                  {Math.ceil(skipValues?.price_before_vat * skipValues?.vat) /
                    100}
                </Text>
              </Col>
              <Col>
                <Text type="secondary" style={{ marginBottom: 0 }}>
                  Total (incl. VAT)
                </Text>
                <Title level={3} style={{ color: "#237804", marginBottom: 0 }}>
                  {skipValues ? `£${priceAfterVat(skipValues)}` : null}
                </Title>
              </Col>
            </Row>

            <Divider style={{ margin: "16px 0" }} />

            <Row gutter={[12, 12]}>
              <Col>
                <Tag
                  color={skipValues?.allowed_on_road ? "success" : "error"}
                  icon={
                    skipValues?.allowed_on_road ? (
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    ) : (
                      <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                    )
                  }
                >
                  {skipValues?.allowed_on_road
                    ? "Allowed On Road"
                    : "Not Allowed On Road"}
                </Tag>
              </Col>
              {skipValues?.allows_heavy_waste && (
                <Col>
                  <Tag icon={<InfoCircleOutlined />} color="blue">
                    Heavy Waste Permitted
                  </Tag>
                </Col>
              )}
            </Row>

            <Paragraph style={{ marginTop: 16 }} type="secondary">
              Ensure you have the proper permits and space to place the skip. If
              placed on the road, a license may be required.
            </Paragraph>
          </Col>
        </Row>
        <Divider />
      </Card>
    </div>
  );
}

export default FinalPage;
