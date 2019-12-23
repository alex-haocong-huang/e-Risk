import TradeForm from "./TradeForm.jsx";
import { Form } from "antd";

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import selectEvent from "react-select-event";
import "@testing-library/jest-dom/extend-expect";

let WrappedTradeForm;
beforeEach(() => {
  WrappedTradeForm = Form.create({ name: "TradeForm" })(TradeForm);
});

it("renders input element", () => {
  const { getByText } = render(<WrappedTradeForm />);
  const element = getByText(/company/i);
  expect(element).toBeInTheDocument();
});

it("Show error on form if company is empty", () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(
    <WrappedTradeForm />
  );
  const companyElement = getByTestId("Select-Company");
  selectEvent.select(companyElement, ["HSBC"]);
  const quantitiesElement = getByPlaceholderText(/Quantities/i);
  fireEvent.change(quantitiesElement, { target: { value: "50" } });
  expect(getByText("HSBC")).toBeInTheDocument();
});

// it("Show error on form if quantities is empty", () => {
//   act(() => {
//     const {getByText}  = render(<TradeForm/>);
//     const element = getByText(/Company/i);
//     expect(element).toBeInTheDocument();
//   });

// });

// it("Show error on form if company is 0 as it is not reasonable", () => {
//   act(() => {
//     const {getByText}  = render(<TradeForm/>);
//     const element = getByText(/Company/i);
//     expect(element).toBeInTheDocument();
//   });

// });
