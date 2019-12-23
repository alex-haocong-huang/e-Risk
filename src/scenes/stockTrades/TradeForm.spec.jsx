import TradeForm from "./TradeForm.jsx";
import { Form } from "antd";

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let WrappedTradeForm;
beforeEach(() => {
  WrappedTradeForm = Form.create({ name: "TradeForm" })(TradeForm);
});

it("renders input element", () => {
  const { getByText } = render(<WrappedTradeForm />);
  const element = getByText(/Add new trade/i);
  expect(element).toBeInTheDocument();
});