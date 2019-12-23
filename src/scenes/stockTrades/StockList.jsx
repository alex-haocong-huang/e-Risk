/*
 * @Author: alex.huang 
 * @Date: 2019-12-23 15:13:16 
 * @Last Modified by:   alex.huang 
 * @Last Modified time: 2019-12-23 15:13:16 
 */
import React from "react";
import { Table } from "antd";
import "./StockList.css";

function StockList(props) {
  // show error if there is no data from service (e.g. no network or api is not avaialable)
  if (
    props === null ||
    props.dataSource === null ||
    props.dataSource === undefined
  ) {
    return (
      <div>
        <h1>Today's trades</h1>
        <label>
          <span>There is no data</span>{" "}
        </label>
      </div>
    );
  }
  return (
    <div>
      <h1>Today's trades</h1>
      <Table
        rowKey="key"
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

export default StockList;
