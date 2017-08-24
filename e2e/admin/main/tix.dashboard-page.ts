import { browser, by, element } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';

var globalConfigs = require("../../tix.global-config.json");
var data = require("../resources/tix." + globalConfigs.envName + "-config.json");

export class DashboardPage {

    private action: string = (globalConfigs.loginUserType == 'producer') ? '' : 'admin';

    constructor() {
        this.navigateTo();
    }

    navigateTo() {
        return browser.get(this.getDashboardUrl());
    }

    getDashboardUrl() {
        return data.appUrl + '/' + this.action;
    }

    /***************    C122    ***************/
    
    hasTradeIxLogo() {
        return element(by.css('app-menu-bar .logo')).isPresent().then((result) => {
            return result;
        });
    }
    
    hasMenuIcon() {
        return element(by.xpath('//md-icon[contains(text(),"menu")]')).isPresent().then((result) => {
            return result;
        });
    }

    hasProfileIcon() {
        return element(by.xpath('//md-icon[contains(text(),"account_circle")]')).isPresent().then((result) => {
            return result;
        });
    }

    clickMenuButton() {
        return element(by.xpath('//md-icon[contains(text(),"menu")]')).click().then(() => {
            return browser.sleep(1500);
        });
    }

    getMenuItemList() {
        return element.all(by.css("app-root md-sidenav-container md-sidenav.menu.mat-sidenav.mat-sidenav-over navigation-menu navigation-menu-item a span")).map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return texts;
        });
    }

    checkMenuItemist() {
        let menu_items = [
          'Seeders',
          'Admin Home',
          'Entity Types',
          'Contact Types',
          'Company Manager',
          'Composer',
          'Bid Offer Ledger',
          'Entity Ledger',
          'Invoice Ledger',
          'Create Offer'
          ];
          
        return this.getMenuItemList().then((elm) => {
            let mnu_items  = [];
            mnu_items = elm;
            return StringUtil.checkIfTwoArraysContainSimilarElements(menu_items, mnu_items);
        });
    }

}