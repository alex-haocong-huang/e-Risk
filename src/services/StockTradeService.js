/*
 * @Author: alex.huang 
 * @Date: 2019-12-23 15:13:37 
 * @Last Modified by:   alex.huang 
 * @Last Modified time: 2019-12-23 15:13:37 
 */
import axios from "axios";

export default class StockTradeService {

  //get init net quantities
  async getStockNetQuantities() {
    try {
      const trades = await this.fetchStockTrades();
      return this.calculateNetQuantities(new Map(), trades);
    } catch (error) {
      console.log(error);
    }
  }

  // fetch stock trades from mock as there is no real api now
  async fetchStockTrades() {
    try {
      let response = await axios.get("../mocks/stockTrades.json");
      console.log(response.data.dataSource);
      return response.data.dataSource;
    } catch (error) {
      console.log(error);
    }
  }

  // Add new trade
  // netQuantities: exist net quantities
  // newTrade: trade to be added
  addNewTrade(netQuantities, newTrade) {
    let quantities = new Map();
    netQuantities.forEach(element => {
      quantities.set(element.company, element);
    });
    const result = this.calculateNetQuantities(quantities, new Array(newTrade));
    return result;
  }

  //calculate Net quantities base on trades
  calculateNetQuantities(netQuantities, trades) {
    try {
      trades.forEach(trade => {
        //assume Company is unique identifier
        let existingTrade = netQuantities.get(trade.company);
        if (existingTrade) {
          existingTrade.total = parseFloat(existingTrade.total) + parseFloat(trade.quantities);
        } else {
          netQuantities.set(trade.company, {
            key: trade.company,
            company: trade.company,
            total: trade.quantities
          });
        }
      });
      //copy new array rather than to change exsiting one
      return Array.from(netQuantities.values());
    } catch (error) {
      console.log(error);
    }
  }
}
