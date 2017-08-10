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

    it('should display tradeix logo', done => {
      expect(dashboardPage.hasTradeixLogo()).toBeTruthy();
      done();
    });

    it('should contain three options in left menu', done => {
      expect(dashboardPage.isProducerDashboardMenuExists()).toBeTruthy();
      expect(dashboardPage.isFileUploadMenuExists()).toBeTruthy();
      expect(dashboardPage.isProfileMenuExits()).toBeTruthy();
      done();
    });

    it('should display minimum 1 and maximum 3 currency box at producer dashboard', done => {
      dashboardPage.getNumberOfCurrencyBoxes().then((count) => {
        expect(count >= 1 && count <= 3).toBeTruthy();
        done();
      });
    });
  });

  xdescribe('C110 - Create Offer and back to Dashboard process validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should found at least one button as enabled of Fund USD/GBP/EUR', done => {
      dashboardPage.getCountOfEnabledFundButtons().then((count) => {
        expect(count).toBeGreaterThanOrEqual(1);
        done();
      });
    });

    it('should click on Fund USD button', done => {
      expect(dashboardPage.clickOnActiveFundButton()).toBeTruthy();
      done();
    });

    it('should choose any one Buyer from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailabaleBuyerAndClickNext()).toBeTruthy();
      done();
    });

    it('should choose any one Invoice from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailableInvoiceAndClickNext()).toBeTruthy();
      done();
    });

    it('should click on "Return to dashboard" button from pop-up', done => {
      expect(dashboardPage.clickReturnToDashboardButtonFromPopup()).toBeTruthy();
      done();
    });

  });

  xdescribe('C111 - Create Offer and Bid Accept process vaidation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should found at least one button as enabled of Fund USD/GBP/EUR', done => {
      dashboardPage.getCountOfEnabledFundButtons().then((count) => {
        expect(count).toBeGreaterThanOrEqual(1);
        done();
      });
    });

    it('should click on first enabled Fund button of USD/GBP/EUR', done => {
      expect(dashboardPage.clickOnActiveFundButton()).toBeTruthy();
      done();
    });

    it('should choose any one Buyer from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailabaleBuyerAndClickNext()).toBeTruthy();
      done();
    });

    it('should choose any one Invoice from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailableInvoiceAndClickNext()).toBeTruthy();
      done();
    });

    it('should click on Review Pricing / bid(s) button', done => {
      expect(dashboardPage.clickReviewPricingOrBidsButtonFromPopup()).toBeTruthy();
      done();
    });

    it('should click  on "Accept" button', done => {
      expect(dashboardPage.clickAcceptButtonFromBidDetails()).toBeTruthy();
      done();
    });

    it('should click on "Ok" button from the "Bid Accepted" pop-up', done => {
      expect(dashboardPage.clickOkButtonFromBidAcceptedPopup()).toBeTruthy();
      done();
    });

  });

  xdescribe('C112 - View Offers, view Bid details and back to Dashboard process validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should found at least one "View Offers" button as enabled for Fund USD/GBP/EUR', done => {
      dashboardPage.getCountOfEnabledViewOffersButtons().then((count) => {
        expect(count).toBeGreaterThanOrEqual(1);
        done();
      });
    });

    it('should click on first enabled "View Offers" button of USD/GBP/EUR', done => {
      expect(dashboardPage.clickOnActiveViewOffersButton()).toBeTruthy();
      done();
    });

    it('should click on any "View bid(s)/ Pricing Summary" button', done => {
      expect(dashboardPage.clickFirstViewBidsOrPricingSummaryButton()).toBeTruthy();
      done();
    });

    it('should click on "Cancel" button of view bid(s) or pricing summary', done => {
      expect(dashboardPage.clickCancelButtonOfViewBidsOrPricingSummary()).toBeTruthy();
      done();
    });

  });

  xdescribe('C113 - View Offers, view Bid details and Accept Bid process validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should click on first enabled "View Offers" button of USD/GBP/EUR', done => {
      expect(dashboardPage.clickOnActiveViewOffersButton()).toBeTruthy();
      done();
    });

    it('should click on any "View bid(s)/ Pricing Summary" button', done => {
      expect(dashboardPage.clickFirstViewBidsOrPricingSummaryButton()).toBeTruthy();
      done();
    });

    it('should click on "Accept" button from Bid Details', done => {
      expect(dashboardPage.clickAcceptButtonFromBidDetails()).toBeTruthy();
      done();
    });

    it('should click on "Ok" button from the "Bid Accepted" pop-up', done => {
      expect(dashboardPage.clickOkButtonFromBidAcceptedPopup()).toBeTruthy();
      done();
    });

  });

  describe('C114 - Choose Buyers - UI validation and back to Dashboard', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should click on first enabled Fund USD/GBP/EUR button', done => {
      expect(dashboardPage.clickOnActiveFundButton()).toBeTruthy();
      done();
    });

    it('check if all buyers are selected by default', done => {
      dashboardPage.getTotalNumberOfAvailableBuyers().then((totalRow) => {
        dashboardPage.getTotalNumberOfSelectedBuyers().then((totalSelected) => {
          expect(totalRow).toEqual(totalSelected);
          done();
        });
      });
    });

    it('check UI header text equals to "Available Buyers"', done => {
      expect(dashboardPage.getUiHeaderTextOfBuyersList()).toEqual("Available Buyers");
      done();
    });

    it('check "Total Available (n)" count, where n should be equal to total number of Buyers in list', done => {
      expect(dashboardPage.getTotalNumberOfAvailableBuyers()).toEqual(dashboardPage.getCountShowedForTotalAvailableBuyers());
      done();
    });

    it('check "Total Available (n)" value, where value should be equal to sum of the values of "Total Invoice Value" column', done => {
      expect(dashboardPage.getValueShowedForTotalAvailableBuyers()).toEqual(dashboardPage.getSumOfAllInvoiceValuesInList());
      done();
    });

    it('check "Total Selected (n)" count, where n should be equal to total number of selected Buyers in list', done => {
      expect(dashboardPage.getTotalNumberOfSelectedBuyers()).toEqual(dashboardPage.getCountShowedForTotalSelectedBuyers());
      done();
    });

    it('check "Total Selected (n)" value, where value should be equal to sum of the values of "Total Invoice Value" column of the selected Buyers', done => {
      expect(dashboardPage.getValueShowedForTotalSelectedBuyers()).toEqual(dashboardPage.getSumOfSelectedInvoiceValuesInList());
      done();
    });

  });

});