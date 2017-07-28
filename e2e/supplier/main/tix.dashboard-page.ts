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

    /***************    C109    ***************/

    isProducerDashboardMenuExists() {
        return element(by.css("app-root app-menu a[href='/producer']")).isPresent();
    }

    isFileUploadMenuExists() {
        return element(by.css("app-root app-menu a[href='/producer/file-upload']")).isPresent();
    }

    isProfileMenuExits() {
        return element(by.css("app-root app-menu [aria-label='account_circle']")).isPresent();
    }

    getNumberOfCurrencyBoxes() {
        return element.all(by.css("app-root app-producer-dashboard app-currency-summary")).count();
    }

    hasTradeixLogo() {
        return element(by.css("app-root app-menu-bar img[src*='logo-light.svg']")).isPresent();
    }

    hasThreeOptionsInLeftMenu() {
        return this.isProducerDashboardMenuExists() && this.isFileUploadMenuExists() && this.isProfileMenuExits();
    }

    /***************    C110    ***************/

    checkExistenceOfFundButtonByType(type) {
        return element(by.css("app-root md-sidenav-container app-producer-dashboard app-currency-summary md-card a[href='/producer/create-offer/choose-buyers/" + type + "']"));
    }

    hasAtLeastOneFundButtonAsEnabled() {
        /*let isExists: boolean = false;
        ["USD", "GBP", "EUR"].forEach((currency) => {
            let found = this.checkExistenceOfFundButtonByType(currency).then((check) => {return check.valueOf();});
            isExists = isExists || found;
        });*/
        return this.checkExistenceOfFundButtonByType("USD") || this.checkExistenceOfFundButtonByType("GBP") || this.checkExistenceOfFundButtonByType("EUR");
    }

}