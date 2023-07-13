import { test, expect } from "@playwright/test";
import User from "../models/user";

test("should be able to login", async ({ page, request, context }) => {
  const user = new User(request, context);
  await user.signup();

  // Logout
  await page.goto("/todo");
  await page.click(
    "button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary"
  );
  const login = page.locator(".login-container");
  expect(login).toBeVisible();

  // login
  await page.goto("/login");
  await page.type("[data-testid=email]", user.email);
  await page.type("[data-testid=password]", user.password);
  await page.click("[data-testid=submit]");

  const noTodos = page.locator("[data-testid=no-todos]");
  await expect(noTodos).toBeVisible();
});
