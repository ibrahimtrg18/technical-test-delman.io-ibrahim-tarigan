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
      console.log(err);
    }
  }
}

export default ApiClient;
