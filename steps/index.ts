import { expect } from '@playwright/test';
import { Given, When, Then } from './.fixtures/fixtures';
import { CPURL, CPPSWD } from './.lib/env';
import { Auth } from './.lib/auth';


Given('I open url to DLink page', async ({ page }) => {
  await page.goto(CPURL);
});

When('I click on {string} button', async ({ page }, name: string) => {
  await page.getByText(name, { exact: true }).click();
//  await page.getByRole('button', { name }).click();
});

When('I click on radio button', async ({ page }) => {   
  await page.getByRole('radio', { name: 'System Administrator(admin)' }).check();
});

When('I enter wrong login', async ({ page }) => {
   await Auth.getPswdFldLocator(page).click();
   await Auth.getPswdFldLocator(page).fill('wrong');
});


Then('I see the message {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

Then('I see the text {string}', async ({ page }, name: string) => {
  await expect(page.getByText(name)).toBeVisible();
});

Then('I see the button {string}', async ({ page }, name: string) => {
  const btnLocator = page.locator("#submit_but");
  await expect(btnLocator).toBeVisible();
  await expect(btnLocator.getByText(name, {exact: true})).toBeVisible();
});


//When('I enter correct password', async ({ page }) => {
//   await page.locator('#pre_pwd').click();
//   await page.locator('#pre_pwd').fill(CPPSWD);
//   await page.locator('#submit_but').click();
// });

