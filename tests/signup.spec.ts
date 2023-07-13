import { test, expect } from "@playwright/test";
import User from "../models/user";
import WebPage from "../pages/web-page";

test("should be able to signup to our application", async ({
  page,
  request,
  context,
}) => {
  const user = new User(request, context);
  const signupPage = new WebPage(page);
  await signupPage.signUp(user);

  const welcomeMessage = page.locator("[data-testid=welcome]");
  await expect(welcomeMessage).toBeVisible();
});
