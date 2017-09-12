import { browser } from 'protractor';
import { DashboardPage } from '../main/tix.dashboard-page';

var globalConfig = require("../../tix.global-config.json");

describe('C122 -Admin panel Home Dashboard UI and Left Menu functionality validation', () => {

    var defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

    afterEach(() => {
        browser.sleep(defaultSpecDelayTime);
    });

    let dashboardPage: DashboardPage = new DashboardPage();

    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should display tradeix logo', (done) =>  {
        expect(dashboardPage.hasTradeIxLogo()).toBe(true);
        done();
    });

    it('should display Menu Icon', (done) => {
        expect(dashboardPage.hasMenuIcon()).toBe(true);
        done();
    });

    it('should display Profile Icon', (done) => {
        expect(dashboardPage.hasProfileIcon()).toBe(true);
        done();
    });

    it('should load menu list page on clicking menu item', (done) => {
        expect(dashboardPage.clickMenuIconAndCheckForPageLoad()).toBe(true);
        done();
    });

    it('should check whether menu items are present or not', (done) => {
        expect(dashboardPage.checkMenuItemist()).toBe(true);
        done();
    });

});