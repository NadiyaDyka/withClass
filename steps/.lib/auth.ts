import { Page, Locator, expect } from '@playwright/test';

export const Auth = {
  getAdminRadioBtnLocator(page: Page): Locator {
    return page.locator('#f_type1');
  },

  getUsersRadioBtnLocator(page: Page): Locator {
    return page.locator('#f_type2');
  },

  getLoginBtnLocator(page: Page): Locator {
    return page.locator('#submit_but');
  },

  async checkAdminRadioBtn(page: Page): Promise<void> {
    await this.getAdminRadioBtnLocator(page).check();
  },

  async clickAdminRadioBtn(page: Page): Promise<void> {
    await this.getAdminRadioBtnLocator(page).click();
  },

  async checkUsersRadioBtn(page: Page): Promise<void> {
    await this.getUsersRadioBtnLocator(page).check();
  },

  getPswdFldLocator(page: Page): Locator {
    return page.locator('#pre_pwd');
  },

  getPswdLabelLocator(page: Page): Locator {
    return page.getByText('Password');
  },

  async fillPswdFld(page: Page, password: string): Promise<void> {
    await this.getPswdFldLocator(page).click();
    await this.getPswdFldLocator(page).fill(password);
  },

  async loginAsAdmin(page: Page, cppswd: string): Promise<void> {
    await this.clickAdminRadioBtn(page);
    await this.fillPswdFld(page, cppswd);
    await this.getLoginBtnLocator(page).click();
  },

  async loginAsUser(page: Page, username: string, CPUSERPSWD: string): Promise<void> {
    await this.checkUsersRadioBtn(page);
    await this.fillUserFld(page, username);
    await this.fillPswdFld(page, CPUSERPSWD);
    await this.getLoginBtnLocator(page).click();
  },

  getUserFldLocator(page: Page): Locator {
    return page.locator('#f_username');
  },

  getUserLabelLocator(page: Page): Locator {
    return page.getByText('Others');
  },

  async fillUserFld(page: Page, name: string): Promise<void> {
    await this.getUserFldLocator(page).fill(name);
  },

  getLoginSuccessLocator(page: Page): Locator {
    return page.getByText('My Folder');
    //return page.getByRole('link', { name: 'Log out' });
  },

  getlogoutBtnLocator(page: Page): Locator {
    return page.getByRole('link', { name: 'Log out' });
  },

  getLogoutSuccessLocator(page: Page): Locator {
    return page.getByText('Please Select Your Account');
  },

  async logout(page: Page): Promise<void> {
    if (await this.getlogoutBtnLocator(page).isVisible()) {
      await this.getlogoutBtnLocator(page).click();
      await expect(this.getLogoutSuccessLocator(page)).toBeVisible();
    } else {
      expect(false, "I didn't find the 'Log out' button").toBe(true); //trick with expect to get message and mark test as failed
    }   
  }
};
