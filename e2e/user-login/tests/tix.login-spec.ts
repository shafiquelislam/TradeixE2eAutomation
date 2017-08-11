import { browser } from 'protractor';
import { LoginPage } from '../main/tix.login-page';

describe('C108 Login validation', () => {

    let loginPage: LoginPage = new LoginPage();

    it('should fill email address and password field', done => {
      expect(loginPage.setEmailAddress()).toBe(true);
      expect(loginPage.setPassword()).toBe(true);
      done();
    });

    it('should perform login action', done => {
      expect(loginPage.clickLoginButton()).toBe(true);
      done();
    });
});