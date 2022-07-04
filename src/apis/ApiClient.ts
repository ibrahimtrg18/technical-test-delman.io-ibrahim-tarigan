type Response = {
  message: string;
  data: any;
};

class ApiClient {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://delman-fe-api.fly.dev";
  }

  async getSales() {
    try {
      const res = await fetch(`${this.baseUrl}`);
      const resJson: Response = await res.json();

      return resJson;
    } catch (err) {
      throw err;
    }
  }

  async getUsers() {
    try {
      const res = await fetch(`${this.baseUrl}/users`);
      const resJson: Response = await res.json();

      return resJson;
    } catch (err) {
      throw err;
    }
  }
}

export default ApiClient;
