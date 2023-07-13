import { Page } from "@playwright/test";
import User from "../models/user";

export default class WebPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  signUpAttr = {
    firstName: "[data-testid=first-name]",
    lastName: "[data-testid=last-name]",
    password: "[data-testid=password]",
    email: "[data-testid=email]",
    confirm: "[data-testid=confirm-password]",
    submit: "[data-testid=submit]",
  };

  addTodoAtrr = {
    add: "[data-testid=add]",
    newTodo: "[data-testid=new-todo]",
    submit: "[data-testid=submit-newTask]",
  };

  async signUp(user: User) {
    await this.page.goto("/signup");
    await this.page.type(this.signUpAttr.firstName, user.firstName);
    await this.page.type(this.signUpAttr.lastName, user.lastName);
    await this.page.type(this.signUpAttr.email, user.email);
    await this.page.type(this.signUpAttr.password, user.password);
    await this.page.type(this.signUpAttr.confirm, user.password);
    await this.page.click(this.signUpAttr.submit);
  }

  async addTodo(item: string) {
    await this.page.goto("/todo");
    await this.page.click("[data-testid=add]");
    await this.page.type("[data-testid=new-todo]", item);
    await this.page.click("[data-testid=submit-newTask]");
  }
  async deleteTodo() {
    await this.page.goto("/todo");
    await this.page.click("data-testid=delete");
  }
  async completeTodo() {
    await this.page.goto("/todo");
    await this.page.click("[data-testid=complete-task]");
  }
}
