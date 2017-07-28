import { browser } from 'protractor';
import { DashboardPage } from '../main/tix.dashboard-page';

let globalConfig = require("../../tix.global-config.json");

describe('C109	Producer Dashboard - Home Dashboard and Left Menu functionality UI validation', () => {
    
    let dashboardPage: DashboardPage = new DashboardPage();

    afterEach(() => {
      browser.sleep(globalConfig.defaultSpecDelayTime);
    });

    it('should display tradeix logo', () => {
      expect(dashboardPage.hasTradeixLogo()).toBeTruthy();
    });

    it('should contain three options in left menu', () => {
      expect(dashboardPage.hasThreeOptionsInLeftMenu()).toBeTruthy();
    });

    it('should display three currency box at producer dashboard', () => {
      expect(dashboardPage.getNumberOfCurrencyBox()).toBe(3);
    });
});