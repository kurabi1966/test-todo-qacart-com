import { faker } from "@faker-js/faker";
import { APIRequestContext, BrowserContext } from "@playwright/test";
import config from "../playwright.config";

export default class User {
  baseUrl = config.use?.baseURL;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  access_token: string;
  userID: string;
  request: APIRequestContext;
  context: BrowserContext;

  constructor(request: APIRequestContext, context: BrowserContext) {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.password = "Test1234";
    this.context = context;
    this.request = request;
  }

  async signup() {
    const response = await this.request.post("/api/v1/users/register", {
      data: {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      },
    });
    const { access_token, userID } = await response.json();
    this.access_token = access_token;
    this.userID = userID;
    await this.context.addCookies([
      { name: "access_token", value: this.access_token, url: this.baseUrl },
      { name: "firstName", value: this.firstName, url: this.baseUrl },
      { name: "userID", value: this.userID, url: this.baseUrl },
    ]);
  }

  async addTodo(item: string) {
    await this.request.post("/api/v1/tasks", {
      data: {
        isCompleted: false,
        item,
      },
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    });
  }
}
