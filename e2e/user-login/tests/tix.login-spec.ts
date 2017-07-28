import { browser } from 'protractor';
import { LoginPage } from '../main/tix.login-page';

describe('C108 Login validation', () => {

    let loginPage: LoginPage = new LoginPage();

    it('should perform login action', () => {
      expect(loginPage.performLoginAction()).toBeTruthy();
    });
});