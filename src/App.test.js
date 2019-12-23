import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Today's trades", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Today's trades/i);
  expect(linkElement).toBeInTheDocument();
});
