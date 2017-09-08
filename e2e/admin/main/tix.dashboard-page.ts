import { browser, by, element, ExpectedConditions, protractor } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { ElementUtil } from '../../utils/tix.element-util';

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

    /***************  COMMON  ****************/

    /***************    C122    ***************/
    
    hasTradeIxLogo() {
        return element(by.css('app-menu-bar .logo')).isPresent().then((result) => {
            return result;
        });
    }
    
    hasMenuIcon() {
        return element(by.css('app-menu aside nav ul li:nth-child(1)')).isPresent().then((result) => {
            return result;
        });
    }

    hasProfileIcon() {
        return element(by.css('app-menu aside nav ul li:nth-child(2)')).isPresent().then((result) => {
            return result;
        });
    }

    clickMenuIconAndCheckForPageLoad() {
        var findElm = element.all(by.css('.mat-sidenav-container .menu.mat-sidenav navigation-menu navigation-menu-item a span'));
        var targetElment = element(by.css('app-menu aside nav ul li:nth-child(1)'));
        var findTxt = 'Invoice Ledger';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return browser.sleep(1000).then(() => {
                return StringUtil.checkIfAnElementExistsInAList(findElm, findTxt);
            });
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