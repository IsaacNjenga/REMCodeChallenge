import { Button, Form, Steps } from "antd";
import React, { useState } from "react";
import AddressSelection from "../components/addressSelection";
import SkipSelection from "../components/skipSelection";
import WasteSelection from "../components/wasteSelection";
import {
  CreditCardOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import FinalPage from "../components/finalPage";
import Swal from "sweetalert2";

const { Step } = Steps;

const titleStyle = {
  color: "white",
  fontSize: "1.5rem",
  fontFamily: "Raleway",
};

const iconStyle = {
  color: "#12369c",
  fontSize: "1.5rem",
  padding: "6px",
  borderRadius: "50%",
  border: "2px solid #12369c",
  marginRight: 8,
};

function Home() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const next = async () => {
    try {
      await form.validateFields();
      console.log("Form values before advancing:", form.getFieldsValue());
      setCurrent(current + 1);
    } catch (err) {
      Swal.fire({
        icon: "warning",
        title: "Wait",
        text: "Please complete the current step before continuing.",
      });
    }
  };

  const prev = () => setCurrent(current - 1);

  const steps = [
    {
      key: "postcode",
      title: (
        <>
          <EnvironmentOutlined style={iconStyle} />
          <span style={titleStyle}>Postcode</span>
        </>
      ),
      content: <AddressSelection form={form}/>,
    },
    {
      key: "waste",
      title: (
        <>
          <DeleteOutlined style={iconStyle} />
          <span style={titleStyle}>Waste Type</span>
        </>
      ),
      content: <WasteSelection form={form}/>,
    },
    {
      key: "skip",
      title: (
        <>
          <TruckOutlined style={iconStyle} />
          <span style={titleStyle}>Select Skip</span>
        </>
      ),
      content: <SkipSelection next={next} form={form}/>,
    },
    {
      key: "final",
      title: (
        <>
          <CreditCardOutlined style={iconStyle} />
          <span style={titleStyle}>Complete</span>
        </>
      ),
      content: <FinalPage form={form}/>,
    },
  ];

  const handleSubmit = async () => {
    const values = await form.getFieldsValue();
    console.log(values);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        padding: 20,
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Steps
          current={current}
          size="large"
          responsive
          style={{ margin: "20px 0px", padding: "0px 30px" }}
        >
          {steps.map((item) => (
            <Step key={item.key} title={item.title} />
          ))}
        </Steps>
        <div style={{ minHeight: 200 }}>{steps[current].content}</div>
        <div
          style={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {current > 0 && (
            <Button onClick={prev} style={{ marginRight: 8 }}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}{" "}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>{" "}
      </Form>
    </div>
  );
}

export default Home;
