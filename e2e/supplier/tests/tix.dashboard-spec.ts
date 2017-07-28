import { browser } from 'protractor';
import { DashboardPage } from '../main/tix.dashboard-page';

let globalConfig = require("../../tix.global-config.json");

describe('Producer Dashboard', () => {
    
  let dashboardPage: DashboardPage = new DashboardPage();

  afterEach(() => {
    browser.sleep(globalConfig.defaultSpecDelayTime);
  });

  describe('C109 - Home Dashboard and Left Menu functionality UI validation', () => {
    it('should display tradeix logo', () => {
      expect(dashboardPage.hasTradeixLogo()).toBeTruthy();
    });

    it('should contain three options in left menu', () => {
      expect(dashboardPage.hasThreeOptionsInLeftMenu()).toBeTruthy();
    });

    it('should display minimum 1 and maximum 3 currency box at producer dashboard', () => {
      dashboardPage.getNumberOfCurrencyBoxes().then((count) => {
        expect(count >= 1 && count <=3).toBeTruthy();
      });
    });
  });

  describe('C110 - Create Offer and back to Dashboard process validation', () => {
    it('should found at least one button as enabled of Fund USD/GBP/EUR', () => {
      expect(dashboardPage.checkExistenceOfFundButtonByType("USD").isEnabled() 
      || dashboardPage.checkExistenceOfFundButtonByType("GBP").isEnabled() 
      || dashboardPage.checkExistenceOfFundButtonByType("EUR").isEnabled()).toBeTruthy();
    });

  });

});