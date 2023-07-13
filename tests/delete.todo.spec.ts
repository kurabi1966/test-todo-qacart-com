import { test, expect } from "@playwright/test";
import User from "../models/user";
import WebPage from "../pages/web-page";

test("should be able to an existing todo", async ({
  page,
  request,
  context,
}) => {
  const user = new User(request, context);
  await user.signup();
  await user.addTodo("Learn terraform");

  // delete todo
  const todoPage = new WebPage(page);
  await todoPage.deleteTodo();

  const noTodoMessage = page.locator("[data-testid=no-todos]");
  await expect(noTodoMessage).toBeVisible();
});
