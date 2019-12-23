import axios from "axios";

export default class CompanyService {
  async getCompanies() {
    try {
      let response = await axios.get("../mocks/companies.json");

      console.log(response);
      return response.data.results;
    } catch (error) {
      console.log(error);
    }
  }
}
