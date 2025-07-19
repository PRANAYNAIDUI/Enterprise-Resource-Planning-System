// modules/data-sharing.service.js
const axios = require('axios');

class DataSharingService {
  constructor() {
    this.hrClient = axios.create({ baseURL: 'http://localhost:3000/api/hr' });
    this.financeClient = axios.create({ baseURL: 'http://localhost:3000/api/finance' });
    this.inventoryClient = axios.create({ baseURL: 'http://localhost:3000/api/inventory' });
  }

  async getEmployeeFinancialData(employeeId) {
    try {
      const employeeResponse = await this.hrClient.get(`/employee/${employeeId}`);
      const financeResponse = await this.financeClient.get(`/transactions?employeeId=${employeeId}`);
      return {
        employee: employeeResponse.data,
        transactions: financeResponse.data
      };
    } catch (error) {
      console.error('Error fetching employee financial data:', error);
      throw error;
    }
  }

  async getInventoryItemFinanceData(itemId) {
    try {
      const itemResponse = await this.inventoryClient.get(`/item/${itemId}`);
      const financeResponse = await this.financeClient.get(`/transactions?itemId=${itemId}`);
      return {
        item: itemResponse.data,
        transactions: financeResponse.data
      };
    } catch (error) {
      console.error('Error fetching inventory item financial data:', error);
      throw error;
    }
  }
}

module.exports = DataSharingService;
