import React from "react";
import { Table } from "antd";
import "./StockList.css";

class StockList extends React.Component {
  RenderTable(props) {
    // show error if there is no data from server (e.g. no network or api is not avaialable)
    if (
      props === null ||
      props.dataSource === null ||
      props.dataSource === undefined
    ) {
      return (
        <label>
          <span>There is no data</span>{" "}
        </label>
      );
    }
    return (
      <div>
        <Table
          size="middle"
          data-testid="trades-list"
          rowClassName={(record, index) => {
            let className = "light-row";
            if (index % 2 === 1) className = "dark-row";
            return className;
          }}
          bordered
          pagination={{ pageSize: 5, hideOnSinglePage: true }}
          dataSource={props.dataSource}
          columns={props.columns}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Today's trades</h1>
        {this.RenderTable(this.props)}
      </div>
    );
  }
}

export default StockList;
