import React from "react";
import StockList from "./StockList";
import TradeForm from "./TradeForm";
import { Form, Row, Col } from "antd";
import StockTradeService from "../../services/StockTradeService";
import "./StockTrades.css";

class StockTrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fradeForm: {}
    };
  }

  async componentDidMount() {
    const service = new StockTradeService();
    const dataSource = await service.getStockNetQuantities();
    this.setState({ dataSource: dataSource });
  }

  addNewTrade = newTrade => {
    const service = new StockTradeService();
    const dataSource = service.addNewTrade(this.state.dataSource,newTrade);
    this.setState({ dataSource: dataSource });
  };

  render() {
    const WrappedTradeForm = Form.create({ name: "TradeForm" })(TradeForm);

    const columns = [
      {
        title: "Company",
        dataIndex: "company",
        sorter: (a, b) => a.company.localeCompare(b.company),
        defaultSortOrder: "descend",
        key: "company"
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total"
      }
    ];

    return (
      <div className="stack-trades">
        <Row>
          <Col span={12}>
            <StockList
              dataSource={this.state.dataSource}
              columns={columns}
            ></StockList>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <WrappedTradeForm addNewTrade={this.addNewTrade}></WrappedTradeForm>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StockTrades;
