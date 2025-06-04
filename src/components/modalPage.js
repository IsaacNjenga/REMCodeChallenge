import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Image,
  Modal,
  Typography,
  Row,
  Col,
  Carousel,
  Divider,
  Tag,
  Form,
  Input,
} from "antd";
import React from "react";
import {
  ClockCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function ModalPage({
  modalContent,
  openModal,
  setOpenModal,
  loading,
  buttonStyle,
  next,
  priceAfterVat,
  form,
}) {
  const handleContinue = async () => {
    await form.setFieldsValue({ skipSelection: modalContent });
    setOpenModal(false);
    next();
  };

  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={750}
      style={{ maxWidth: "95vw" }}
    >
      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
          padding: 10,
          margin: 5,
        }}
      >
        <Form.Item name="skipSelection" noStyle>
          <Input type="hidden" />
        </Form.Item>

        <Row gutter={[24, 24]}>
          {/* Left: Carousel */}
          <Col xs={24} md={10}>
            <Carousel autoplay autoplaySpeed={4500} dots>
              {(modalContent?.img?.length > 0
                ? modalContent.img
                : [modalContent?.img]
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
              {modalContent?.size} Yard Skip
            </Title>

            <Text type="secondary">
              <ClockCircleOutlined /> {modalContent?.hire_period_days}-day hire
            </Text>

            <Divider style={{ margin: "12px 0" }} />

            <Row justify="space-between" align="middle">
              <Col>
                <Text type="secondary">Base Price:</Text>
                <br />
                <Text strong>£{modalContent?.price_before_vat}</Text>
              </Col>
              <Col>
                <Text type="secondary">VAT ({modalContent?.vat}%)</Text>
                <br />
                <Text strong>
                  £
                  {Math.ceil(
                    modalContent?.price_before_vat * modalContent?.vat
                  ) / 100}
                </Text>
              </Col>
              <Col>
                <Text type="secondary" style={{ marginBottom: 0 }}>
                  Total (incl. VAT)
                </Text>
                <Title level={3} style={{ color: "#237804", marginBottom: 0 }}>
                  {modalContent ? `£${priceAfterVat(modalContent)}` : null}
                </Title>
              </Col>
            </Row>

            <Divider style={{ margin: "16px 0" }} />

            <Row gutter={[12, 12]}>
              <Col>
                <Tag
                  color={modalContent?.allowed_on_road ? "success" : "error"}
                  icon={
                    modalContent?.allowed_on_road ? (
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    ) : (
                      <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                    )
                  }
                >
                  {modalContent?.allowed_on_road
                    ? "Allowed On Road"
                    : "Not Allowed On Road"}
                </Tag>
              </Col>
              {modalContent?.allows_heavy_waste && (
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

        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          block
          size="large"
          style={buttonStyle}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Card>
    </Modal>
  );
}

export default ModalPage;
