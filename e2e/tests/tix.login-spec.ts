import { browser } from 'protractor';
import { LoginPage } from '../main/tix.login-page';

describe('tradeix-e2e-automation App', () => {
  let page: LoginPage = new LoginPage();;

  beforeEach(() => {
    
  });

  afterEach(() => {
    browser.sleep(2000);
  });

  it('should perform login action', () => {
    page.performLoginAction();
  });
});
