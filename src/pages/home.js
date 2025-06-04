import { Button, Steps } from "antd";
import React, { useState } from "react";
import AddressSelection from "../components/addressSelection";
import SkipSelection from "../components/skipSelection";
import WasteSelection from "../components/wasteSelection";
import {
  DeleteOutlined,
  EnvironmentOutlined,
  TruckOutlined,
} from "@ant-design/icons";

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

  const steps = [
    {
      key: "postcode",
      title: (
        <>
          <EnvironmentOutlined style={iconStyle} />
          <span style={titleStyle}>Postcode</span>
        </>
      ),
      content: <AddressSelection />,
    },
    {
      key: "waste",
      title: (
        <>
          <DeleteOutlined style={iconStyle} />
          <span style={titleStyle}>Waste Type</span>
        </>
      ),
      content: <WasteSelection />,
    },
    {
      key: "skip",
      title: (
        <>
          <TruckOutlined style={iconStyle} />
          <span style={titleStyle}>Select Skip</span>
        </>
      ),
      content: <SkipSelection />,
    },
  ];

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        padding: 20,
      }}
    >
      <Steps
        current={current}
        size="large"
        responsive
        style={{ margin: "30px 0px", padding: "0px 30px" }}
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
        )}
      </div>
    </div>
  );
}

export default Home;
