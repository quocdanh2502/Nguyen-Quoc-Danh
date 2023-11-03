import React, { useState } from "react";
import { Button, Flex, Form, Input, Select } from "antd";

import { TYPE_MONEY } from "./config/constant";
import convertApi from "./services/api/convert";
import "./App.css";

const App = () => {
  const [valueIn, setValueIn] = useState(0);
  const [valueOut, setValueOut] = useState(0);
  const [indexIn, setIndexIn] = useState("USD");
  const [indexOut, setIndexOut] = useState("VND");

  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || 0, 10);
    if (isNaN(newNumber)) {
      return;
    }
    setValueIn(newNumber);
  };

  const onCurrencyChange = (newCurrency, status) => {
    if (status === "in") {
      setIndexIn(newCurrency);
    } else {
      setIndexOut(newCurrency);
    }
  };

  const onFinish = async () => {
    const data = await convertApi.getConvert({
      base: indexIn,
      symbols: indexOut,
      amount: valueIn,
    });
    setValueOut(data.data.conversion_result);
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{ minHeight: "100vh", background: "#56baed" }}
    >
      <Form
        name="customized_form_controls"
        layout="vertical"
        onFinish={onFinish}
        className="fadeInDown form"
      >
        <Form.Item>
          <h1 className="header">Currency conversion</h1>
        </Form.Item>
        <Form.Item name="price" label="Convert from">
          <span>
            <Input
              type="text"
              value={valueIn}
              style={{
                width: 300,
              }}
              onChange={onNumberChange}
            />
            <Select
              showSearch
              value={indexIn}
              style={{
                width: 80,
                margin: "0 8px",
              }}
              onChange={(newCurrency) => onCurrencyChange(newCurrency, "in")}
              options={TYPE_MONEY}
            />
          </span>
        </Form.Item>
        <Form.Item name="index" label="To">
          <span>
            <Input
              type="text"
              value={valueOut}
              style={{
                width: 300,
              }}
              disabled
            />
            <Select
              showSearch
              value={indexOut}
              style={{
                width: 80,
                margin: "0 8px",
              }}
              onChange={(newCurrency) => onCurrencyChange(newCurrency, "out")}
              options={TYPE_MONEY}
            />
          </span>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
            }}
          >
            Convert
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
export default App;
