import React from "react";
import "./App.css";
import StockTrades from "./scenes/stockTrades/StockTrades";

class App extends React.Component {
  render() {
    return (
      <div>
        <StockTrades></StockTrades>
      </div>
    );
  }
}

export default App;
