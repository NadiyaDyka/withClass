import { Page, Locator } from '@playwright/test';

export const Auth = {
  getPswdFldLocator( page: Page ): Locator {
    return page.locator('#pre_pwd');
  }
  //await page.getByRole('radio', { name: 'System Administrator(admin)' }).check();
};