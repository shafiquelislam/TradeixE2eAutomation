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
      expect(dashboardPage.hasTradeixLogo()).toBe(true);
      done();
    });

    it('should contain three options in left menu', done => {
      expect(dashboardPage.isProducerDashboardMenuExists()).toBe(true);
      expect(dashboardPage.isFileUploadMenuExists()).toBe(true);
      expect(dashboardPage.isProfileMenuExits()).toBe(true);
      done();
    });

    it('should display minimum 1 and maximum 3 currency box at producer dashboard', done => {
      dashboardPage.getNumberOfCurrencyBoxes().then((count) => {
        expect(count >= 1 && count <= 3).toBe(true);
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
      expect(dashboardPage.clickOnActiveFundButton()).toBe(true);
      done();
    });

    it('should choose any one Buyer from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailabaleBuyerAndClickNext()).toBe(true);
      done();
    });

    it('should choose any one Invoice from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailableInvoiceAndClickNext()).toBe(true);
      done();
    });

    it('should click on "Return to dashboard" button from pop-up', done => {
      expect(dashboardPage.clickReturnToDashboardButtonFromPopup()).toBe(true);
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
      expect(dashboardPage.clickOnActiveFundButton()).toBe(true);
      done();
    });

    it('should choose any one Buyer from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailabaleBuyerAndClickNext()).toBe(true);
      done();
    });

    it('should choose any one Invoice from the list and then click on "Next" button', done => {
      expect(dashboardPage.chooseFirstAvailableInvoiceAndClickNext()).toBe(true);
      done();
    });

    it('should click on Review Pricing / bid(s) button', done => {
      expect(dashboardPage.clickReviewPricingOrBidsButtonFromPopup()).toBe(true);
      done();
    });

    it('should click  on "Accept" button', done => {
      expect(dashboardPage.clickAcceptButtonFromBidDetails()).toBe(true);
      done();
    });

    it('should click on "Ok" button from the "Bid Accepted" pop-up', done => {
      expect(dashboardPage.clickOkButtonFromBidAcceptedPopup()).toBe(true);
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
      expect(dashboardPage.clickOnActiveViewOffersButton()).toBe(true);
      done();
    });

    it('should click on any "View bid(s)/ Pricing Summary" button', done => {
      expect(dashboardPage.clickFirstViewBidsOrPricingSummaryButton()).toBe(true);
      done();
    });

    it('should click on "Cancel" button of view bid(s) or pricing summary', done => {
      expect(dashboardPage.clickCancelButtonOfViewBidsOrPricingSummary()).toBe(true);
      done();
    });

  });

  xdescribe('C113 - View Offers, view Bid details and Accept Bid process validation', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should click on first enabled "View Offers" button of USD/GBP/EUR', done => {
      expect(dashboardPage.clickOnActiveViewOffersButton()).toBe(true);
      done();
    });

    it('should click on any "View bid(s)/ Pricing Summary" button', done => {
      expect(dashboardPage.clickFirstViewBidsOrPricingSummaryButton()).toBe(true);
      done();
    });

    it('should click on "Accept" button from Bid Details', done => {
      expect(dashboardPage.clickAcceptButtonFromBidDetails()).toBe(true);
      done();
    });

    it('should click on "Ok" button from the "Bid Accepted" pop-up', done => {
      expect(dashboardPage.clickOkButtonFromBidAcceptedPopup()).toBe(true);
      done();
    });

  });

  xdescribe('C114 - Choose Buyers - UI validation and back to Dashboard', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should click on first enabled Fund USD/GBP/EUR button', done => {
      expect(dashboardPage.clickOnActiveFundButton()).toBe(true);
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

    it('should have appropriate column names in Data Grid columns', done => {
      expect(dashboardPage.checkIfDataGridColumnsNamesAsPerExpectation()).toBe(true);
      done();
    });

    it('should click on "Cancel" button and back to Producer Dashboard', done => {
      expect(dashboardPage.clickOnCancelButtonFromBuyersListView()).toBe(true);
      done();
    });
  });

});
