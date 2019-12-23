import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import StockList from "./StockList.jsx";

it("renders stock list title", () => {
  act(() => {
    const { getByText } = render(<StockList />);
    const noDataElement = getByText(/Today's trades/i);
    expect(noDataElement).toBeInTheDocument();
  });
});

it("renders no data labe is there is no data", () => {
  act(() => {
    const { getByText } = render(<StockList />);
    const noDataElement = getByText(/There is no data/i);
    expect(noDataElement).toBeInTheDocument();
  });
});

it("renders  data labe with data", () => {
  act(() => {
    const dataSource = [
      {
        key: "1",
        Company: "Google",
        Total: 900
      },
      {
        key: "2",
        Company: "Microsoft",
        Total: 100
      },
      {
        key: "3",
        Company: "Amazon",
        Total: -150
      }
    ];
    const columns = [
      {
        title: "Company",
        dataIndex: "Company",
        key: "Company"
      },
      {
        title: "Total",
        dataIndex: "Total",
        key: "Total"
      }
    ];

    const { getByTestId } = render(
      <StockList dataSource={dataSource} columns={columns} />
    );
    const tableElement = getByTestId("trades-list");
    expect(tableElement).toBeInTheDocument();
  });
});
