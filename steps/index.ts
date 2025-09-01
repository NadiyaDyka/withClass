import { expect } from '@playwright/test';
import { Given, When, Then } from './.fixtures/fixtures';
import { CPURL, CPPSWD } from './.lib/env';
import { Auth } from './.lib/auth';

Given('I open url to DLink page', async ({ page }) => {
  await page.goto(CPURL);
});

When('I check System Administrator\\(admin\\) radio button', async ({ page }) => {
  Auth.checkAdminRadioBtn(page);
});

When('I click System Administrator\\(admin\\) radio button', async ({ page }) => {
  Auth.clickAdminRadioBtn(page);
});

When('I check Other radio button', async ({ page }) => {
  await Auth.checkUsersRadioBtn(page);
});

When('I enter a username {string}', async ({ page }, name: string) => {
  await Auth.fillUserFld(page, name);
});

When('I see the radio buttons for choosing user', async ({ page }) => {
  await expect(Auth.getAdminRadioBtnLocator(page)).toBeVisible();
  await expect(Auth.getUsersRadioBtnLocator(page)).toBeVisible();
});

Then('I see the message {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

Then('I see the text {string}', async ({ page }, name: string) => {
  await expect(page.getByText(name)).toBeVisible();
});

Then('I see the button {string}', async ({ page }, name: string) => {
  await expect(Auth.getLoginBtnLocator(page)).toBeVisible();
  await expect(Auth.getLoginBtnLocator(page).getByText(name, { exact: true })).toBeVisible();
});

Then('I see the username {string} in the field', async ({ page }, expectedName: string) => {
  await expect(Auth.getUserFldLocator(page)).toHaveValue(expectedName);
});

Then('I see the username field', async ({ page }) => {
  await expect(Auth.getUserFldLocator(page)).toBeVisible();
});

When('I enter incorrect password', async ({ page }) => {
  await Auth.fillPswdFld(page, 'wrong');
});

When('I see the password field', async ({ page }) => {
  await expect(Auth.getPswdFldLocator(page)).toBeVisible();
});

When('I click on {string} button', async ({ page }, name: string) => {
  await page.getByText(name, { exact: true }).click();
});

When('I enter correct password', async ({ page }) => {
  await Auth.fillPswdFld(page, CPPSWD);
});

Then('I see the focus on Others users', async ({ page }) => {
  await expect(Auth.getUserFldLocator(page)).toBeFocused();
});

Then('I see the focus on Password', async ({ page }) => {
  await expect(Auth.getPswdFldLocator(page)).toBeFocused();
});

//When('I enter correct password', async ({ page }) => {
//   await page.locator('#pre_pwd').click();
//   await page.locator('#pre_pwd').fill(CPPSWD);
//   await page.locator('#submit_but').click();
// });
