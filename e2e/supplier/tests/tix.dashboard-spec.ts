import { browser } from 'protractor';
import { DashboardPage } from '../main/tix.dashboard-page';

var globalConfig = require("../../tix.global-config.json");

describe('Producer Dashboard', () => {
    
  let dashboardPage: DashboardPage = new DashboardPage();
  let defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

  afterEach(() => {
    browser.sleep(defaultSpecDelayTime);
  });

  describe('C109 - Home Dashboard and Left Menu functionality UI validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should display tradeix logo', () => {
      expect(dashboardPage.hasTradeixLogo()).toBeTruthy();
    });

    it('should contain three options in left menu', () => {
      expect(dashboardPage.isProducerDashboardMenuExists()).toBeTruthy();
      expect(dashboardPage.isFileUploadMenuExists()).toBeTruthy();
      expect(dashboardPage.isProfileMenuExits()).toBeTruthy();
    });

    it('should display minimum 1 and maximum 3 currency box at producer dashboard', () => {
      dashboardPage.getNumberOfCurrencyBoxes().then((count) => {
        expect(count >= 1 && count <=3).toBeTruthy();
      });
    });
  });

  describe('C110 - Create Offer and back to Dashboard process validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should found at least one button as enabled of Fund USD/GBP/EUR', () => {
      dashboardPage.getCountOfEnabledFundButtons().then((count) => {
        expect(count).toBeGreaterThanOrEqual(1);
      });
    });

    it('should click on Fund USD button', () => {
      expect(dashboardPage.clickOnActiveFundButton()).toBeTruthy();
    });

    it('should choose any one Buyer from the list and then click on "Next" button', () => {
      expect(dashboardPage.chooseFirstAvailabaleBuyerAndClickNext()).toBeTruthy();
    });

    it('should choose any one Invoice from the list and then click on "Next" button', () => {
      expect(dashboardPage.chooseFirstAvailableInvoiceAndClickNext()).toBeTruthy();      
    });

    it('should click on "Return to dashboard" button from pop-up', () => {
      expect(dashboardPage.clickReturnToDashboardButtonFromPopup()).toBeTruthy();    
    });

  });

  describe('C111 - Create Offer and Bid Accept process vaidation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should found at least one button as enabled of Fund USD/GBP/EUR', () => {
      dashboardPage.getCountOfEnabledFundButtons().then((count) => {
        expect(count).toBeGreaterThanOrEqual(1);
      });
    });

    it('should click on first enabled Fund button of USD/GBP/EUR', () => {
      expect(dashboardPage.clickOnActiveFundButton()).toBeTruthy();
    });

    it('should choose any one Buyer from the list and then click on "Next" button', () => {
      expect(dashboardPage.chooseFirstAvailabaleBuyerAndClickNext()).toBeTruthy();
    });

    it('should choose any one Invoice from the list and then click on "Next" button', () => {
      expect(dashboardPage.chooseFirstAvailableInvoiceAndClickNext()).toBeTruthy();      
    });

    it('should click on Review Pricing / bid(s) button', () => {
      expect(dashboardPage.clickReviewPricingOrBidsButtonFromPopup()).toBeTruthy();    
    });

    it('should click  on "Accept" button', () => {
      expect(dashboardPage.clickAcceptButtonFromBidDetails()).toBeTruthy();    
    });

    it('should click on Review Pricing / bid(s) button', () => {
      expect(dashboardPage.clickOkButtonFromBidAcceptedPopup()).toBeTruthy();    
    });

  });

  describe('C112 - View Offers, view Bid details and back to Dashboard process validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should found at least one "View Offers" button as enabled for Fund USD/GBP/EUR', () => {
      dashboardPage.getCountOfEnabledViewOffersButtons().then((count) => {
        expect(count).toBeGreaterThanOrEqual(1);
      });
    });

    it('should click on first enabled "View Offers" button of USD/GBP/EUR', () => {
      expect(dashboardPage.clickOnActiveViewOffersButton()).toBeTruthy();
    });

    it('should click on any "View bid(s)/ Pricing Summary" button', () => {
      expect(dashboardPage.clickFirstViewBidsOrPricingSummaryButton()).toBeTruthy();
    });

    it('should click on "Cancel" button of view bid(s) or pricing summary', () => {
      expect(dashboardPage.clickCancelButtonOfViewBidsOrPricingSummary()).toBeTruthy();      
    });

  });

});