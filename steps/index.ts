import { expect } from '@playwright/test';
import { Given, When, Then } from './.fixtures/fixtures';
import { CPURL } from './.lib/env';

Given('I open url to DLink page', async ({ page }) => {
  await page.goto(CPURL);
});

When('I click on {string} button', async ({ page }, name: string) => {
  await page.getByText(name, { exact: true }).click();
//  await page.getByRole('button', { name }).click();
});

//When('I click on radio button {string}', async ({ page }) => {   
//  await page.getByLabel('System Administrator(admin)').check();
//});

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