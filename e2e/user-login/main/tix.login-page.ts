import { browser, by, element } from 'protractor';

let configs = require("../resources/tix.login-data.json");

export class LoginPage {
  
  private loginCredentials: any = configs.loginCredentials[configs.loginUserType];

  constructor() {
    this.navigateTo();
  }

  navigateTo() {
    browser.ignoreSynchronization = true;
    return browser.driver.get(configs.appUrl);
  }

  delayAfterActionForVisibility() {
    browser.sleep(configs.defaultSpecDelayTime);
  }

  getEmailAddressField() {
    return element(by.id("emailAddress"));
  }

  getPasswordField() {
    return element(by.id("password"));
  }

  setEmailAddress() {
    this.getEmailAddressField().sendKeys(this.loginCredentials.username);
    this.delayAfterActionForVisibility();
  }

  setPassword() {
    this.getPasswordField().sendKeys(this.loginCredentials.password);
    this.delayAfterActionForVisibility();
  }

  clickLoginButton() {
    element(by.id("login-button")).click();
  }

  submitLoginForm() {
    element(by.css("form.login-form")).submit();
  }

  performLoginAction() {
    this.setEmailAddress();
    this.setPassword();
    this.clickLoginButton();
    return true;
  }

}
