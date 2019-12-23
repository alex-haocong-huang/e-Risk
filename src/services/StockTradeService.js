import axios from "axios";

export default class StockTradeService {
  async getStockTrades() {
    try {
      let response = await axios.get("../mocks/stockTrades.json");
      return response.data.dataSource;
    } catch (error) {
      console.log(error);
    }
  }
}
