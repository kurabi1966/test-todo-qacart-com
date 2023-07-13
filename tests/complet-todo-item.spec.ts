import { test, expect } from "@playwright/test";
import User from "../models/user";
import WebPage from "../pages/web-page";

test("should be able to complete a todo item", async ({
  page,
  request,
  context,
}) => {
  const user = new User(request, context);
  await user.signup();
  await user.addTodo("Learn terraform");

  const todoPage = new WebPage(page);
  await todoPage.completeTodo();
  const todoTask = page.locator("[data-testid=todo-text]");
  await expect(todoTask).toHaveCSS(
    "text-decoration",
    "line-through solid rgb(145, 158, 171)"
  );
});
