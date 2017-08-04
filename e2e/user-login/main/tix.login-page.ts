import { browser, by, element, protractor } from 'protractor';

let loginConfigs = require("../resources/tix.login-data.json");
let globalConfigs = require("../../tix.global-config.json");

export class LoginPage {
  
  private loginCredentials: any = loginConfigs.loginCredentials[globalConfigs.loginUserType];
  private defaultSpecDelayTime: number = globalConfigs.defaultSpecDelayTime;

  constructor() {
    this.navigateTo();
  }

  navigateTo() {
    browser.ignoreSynchronization = true;
    return browser.driver.get(loginConfigs.appUrl);
  }

  delayAfterActionForVisibility() {
    return browser.sleep(this.defaultSpecDelayTime);
  }

  getEmailAddressField() {
    return element(by.id("emailAddress"));
  }

  getPasswordField() {
    return element(by.id("password"));
  }

  setEmailAddress() {
    return this.getEmailAddressField().sendKeys(this.loginCredentials.username).then(() => {
      return this.delayAfterActionForVisibility().then(() => {
          return true;
      });
    });;
  }

  setPassword() {
    return this.getPasswordField().sendKeys(this.loginCredentials.password).then(() => {
      return this.delayAfterActionForVisibility().then(() => {
        return true;
      });
    });
  }

  clickLoginButton() {
    return element(by.id("login-button")).click().then(() => {
      return true;
    });
  }

  submitLoginForm() {
    return element(by.css("form.login-form")).submit().then(() => {
        return true;
    });
  }

  pressEnter() {
    browser.actions().sendKeys(protractor.Key.ENTER).perform().then(() => {
        return true;
    });
  }

}