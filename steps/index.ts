import { expect } from '@playwright/test';
import { Given, When, Then } from './.fixtures/fixtures';
import { CPURL, CPPSWD, CPUSERPSWD } from './.lib/env';
import { Auth } from './.lib/auth';

Given('I open url to DLink page', async ({ page }) => {
  await page.goto(CPURL);
});

Given('someone already logged in as admin', async ({ page, browser, pocket }, name: string) => {
  //parameters { page, browser, pocket } are all fixtures, whicn are parts of "big object", but we can use parts of that object what we need, not need to take the whole object
  const context = await browser.newContext();
  const page2 = await context.newPage();
  await page2.goto(CPURL);
  await Auth.loginAsAdmin(page2, CPPSWD);
  await expect(Auth.getLoginSuccessLocator(page2), "I didn't find the text 'My Folder'") //soft mode, second parameter as message for user
    .toBeVisible();
  pocket.page2 = page2;
  await page2.waitForTimeout(1000);
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

When('I enter a username {string}', async ({ page }, cpuser: string) => {
  Auth.fillUserFld(page, cpuser);
});

When('I see the radio buttons for choosing user', async ({ page }) => {
  await expect(Auth.getAdminRadioBtnLocator(page)).toBeVisible();
  await expect(Auth.getUsersRadioBtnLocator(page)).toBeVisible();
});

Then('I see the message {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

Then('I see the message for user {string}', async ({ page, pocket }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
  if (pocket.page2) {
    await Auth.logout(page2);
  }
});

Then('I see the text {string}', async ({ page }, name: string) => {
  await expect(page.getByText(name)).toBeVisible();
});

Then('I see the button {string}', async ({ page }, name: string) => {
  await expect(Auth.getLoginBtnLocator(page)).toBeVisible();
  await expect(Auth.getLoginBtnLocator(page).getByText(name, { exact: true })).toBeVisible();
});

Then('I see the username {string} in the field', async ({ page }, cpuser: string) => {
  await expect(Auth.getUserFldLocator(page)).toHaveValue(cpuser);
});

Then('I see the username field', async ({ page }) => {
  await expect(Auth.getUserFldLocator(page)).toBeVisible();
});

When('I enter incorrect password', async ({ page }) => {
  await Auth.fillPswdFld(page, 'wrong');
});

When('I enter correct password', async ({ page }) => {
  await Auth.fillPswdFld(page, CPPSWD);
});

When('I enter correct password for user', async ({ page }) => {
  await Auth.fillPswdFld(page, CPUSERPSWD);
});

When('I see the password field', async ({ page }) => {
  await expect(Auth.getPswdFldLocator(page)).toBeVisible();
});

When('I click on {string} button', async ({ page }, name: string) => {
  await page.getByText(name, { exact: true }).click();
});

When('I login as admin with the wrong password', async ({ page }) => {
  await Auth.loginAsAdmin(page, 'wrong');
});

When('I login as Others user {string}', async ({ page }, username) => {
  await Auth.loginAsUser(page, username, CPPSWD);
});

When('I login as System Administrator\\(admin)', async ({ page }) => {
  await Auth.loginAsAdmin(page, CPPSWD);
});

When('I login as {string}', async ({ page }, username: string) => {
  await Auth.loginAsUser(page, username, CPUSERPSWD);
});

Then('I see the focus on Others users', async ({ page }) => {
  await expect(Auth.getUserFldLocator(page)).toBeFocused();
});

Then('I see the focus on Password', async ({ page }) => {
  await expect(Auth.getPswdFldLocator(page)).toBeFocused();
});

Then('I successfully logged in', async ({ page }) => {
  await expect
    .soft(Auth.getLoginSuccessLocator(page), "I didn't find the text 'My Folder'") //soft mode, second parameter as message for user
    .toBeVisible();
  await Auth.logout(page);
});
