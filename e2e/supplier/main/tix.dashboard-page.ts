import { browser, by, element } from 'protractor';

let configs = require("../../user-login/resources/tix.login-data.json");

export class DashboardPage {

    private action: string = (configs.loginUserType == 'admin') ? 'admin' : 'producer';

    constructor() {
        this.navigateTo();
    }

    navigateTo() {
        return browser.get(this.getDashboardUrl());
    }

    getDashboardUrl() {
        return configs.appUrl + '/' + this.action;
    }

    isProducerDashboardMenuExists() {
        return element(by.css("app-root app-menu a[href='/producer']")).isPresent();
    }

    isFileUploadMenuExists() {
        return element(by.css("app-root app-menu a[href='/producer/file-upload']")).isPresent();
    }

    isProfileMenuExits() {
        return element(by.css("app-root app-menu [aria-label='account_circle']")).isPresent();
    }

    hasTradeixLogo() {
        return element(by.css("app-root app-menu-bar img[src*='logo-light.svg']")).isPresent();
    }

    hasThreeOptionsInLeftMenu() {
        return this.isProducerDashboardMenuExists() && this.isFileUploadMenuExists() && this.isProfileMenuExits();
    }

    getNumberOfCurrencyBox() {
        return element.all(by.css("app-root app-producer-dashboard app-currency-summary")).count();
    }

}