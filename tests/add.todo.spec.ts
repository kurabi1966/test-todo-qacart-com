import { test, expect } from "@playwright/test";
import User from "../models/user";
import WebPage from "../pages/web-page";

test("should be able to add a new todo", async ({ page, request, context }) => {
  const user = new User(request, context);
  await user.signup();
  // add todo
  const todoPage = new WebPage(page);
  await todoPage.addTodo("New todo");
  const todo = page.locator("[data-testid=todo-item]");
  expect(await todo.innerText()).toEqual("New todo");
});
