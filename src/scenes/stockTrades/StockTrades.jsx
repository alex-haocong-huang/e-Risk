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
    const dataSource = await service.getStockTrades();
    this.setState({ dataSource: dataSource });
  }

  addNewTrade = newTrade => {
    //copy new array rather than to change exsiting one
    let dataSource = this.state.dataSource.slice();
    let trade = dataSource.find(trade => {
      return trade.Company === newTrade.Company;
    });
    if (trade) {
      trade.Total += parseInt(newTrade.Quantities);
    } else {
      const key = dataSource.length + 1;
      dataSource.push({
        key: key,
        Company: newTrade.Company,
        Total: parseInt(newTrade.Quantities)
      });
    }
    this.setState({ dataSource: dataSource });
  };

  render() {
    const WrappedTradeForm = Form.create({ name: "TradeForm" })(TradeForm);

    const columns = [
      {
        title: "Company",
        dataIndex: "Company",
        sorter: (a, b) => a.Company.localeCompare(b.Company),
        defaultSortOrder: "descend",
        key: "Company"
      },
      {
        title: "Total",
        dataIndex: "Total",
        key: "Total"
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
