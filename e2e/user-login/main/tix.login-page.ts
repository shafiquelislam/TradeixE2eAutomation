import { browser, by, element, protractor } from 'protractor';

let configs = require("../resources/tix.login-data.json");
let defaultSpecDelayTime = require("../../tix.global-config.json").defaultSpecDelayTime;

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
    browser.sleep(defaultSpecDelayTime);
  }

  getEmailAddressField() {
    return element(by.id("emailAddress"));
  }

  getPasswordField() {
    return element(by.id("password"));
  }

  setEmailAddress() {
    this.getEmailAddressField().sendKeys(this.loginCredentials.username).then((prom) => {
      this.delayAfterActionForVisibility();
    });;
  }

  setPassword() {
    this.getPasswordField().sendKeys(this.loginCredentials.password).then((prom) => {
      this.delayAfterActionForVisibility();
    });
  }

  clickLoginButton() {
    element(by.id("login-button")).click();
  }

  submitLoginForm() {
    element(by.css("form.login-form")).submit();
  }

  pressEnter() {
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }

  performLoginAction() {
    this.setEmailAddress();
    this.setPassword();
    this.pressEnter();
    // need to check if login done
    return true;
  }

}
