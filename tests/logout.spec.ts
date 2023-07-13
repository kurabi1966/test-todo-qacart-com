import { test, expect } from "@playwright/test";
import User from "../models/user";

test("should be able to logout", async ({ page, request, context }) => {
  const user = new User(request, context);
  await user.signup();

  // Logout
  await page.goto("/todo");
  await page.click(
    "button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary"
  );
  const login = page.locator(".login-container");
  expect(login).toBeVisible();
});
