import { CreateUser } from "../ts/intefaces";

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

  async createUser(data: CreateUser) {
    try {
      const res = await fetch(`${this.baseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resJson: Response = await res.json();

      if (!res.ok) {
        throw new Error(`user with email ${data.email} already exists`);
      }

      return resJson;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export default ApiClient;
