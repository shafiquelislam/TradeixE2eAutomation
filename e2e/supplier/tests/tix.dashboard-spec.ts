import { browser } from 'protractor';
import { DashboardPage } from '../main/tix.dashboard-page';

const globalConfig = require('../../tix.global-config.json');

describe('Producer Dashboard', () => {

  let dashboardPage: DashboardPage = new DashboardPage();
  const defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

  beforeAll(() => {
    browser.sleep(defaultSpecDelayTime);
  });

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

  describe('C110 - Create Offer and back to Dashboard process validation', () => {
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

  describe('C111 - Create Offer and Bid Accept process vaidation', () => {

    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should found at least one button as enabled of Fund USD/GBP/EUR', done => {
      expect(dashboardPage.getCountOfEnabledFundButtons()).toBeGreaterThanOrEqual(1);
      done();
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

  describe('C112 - View Offers, view Bid details and back to Dashboard process validation', () => {
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

  describe('C113 - View Offers, view Bid details and Accept Bid process validation', () => {
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

  describe('C114 - Choose Buyers - UI validation and back to Dashboard', () => {
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
      expect(dashboardPage.getUiHeaderTextOfBuyersList()).toEqual('Available Buyers');
      done();
    });

    it('check "Total Available (n)" count, where n should be equal to total number of Buyers in list', done => {
      expect(dashboardPage.getTotalNumberOfAvailableBuyers()).toEqual(dashboardPage.getCountShowedForTotalAvailableBuyers());
      done();
    });

    it('check "Total Available (n)" value, where value should be equal to sum of the values of "Total Invoice Value" column', done => {
      expect(dashboardPage.getValueShowedForTotalAvailableBuyers()).toEqual(dashboardPage.getSumOfAllInvoiceValuesInBuyersList());
      done();
    });

    it('check "Total Selected (n)" count, where n should be equal to total number of selected Buyers in list', done => {
      expect(dashboardPage.getTotalNumberOfSelectedBuyers()).toEqual(dashboardPage.getCountShowedForTotalSelectedBuyers());
      done();
    });

    it('check "Total Selected (n)" value, where value should be equal to sum of the values of "Total Invoice Value" column of the selected Buyers', done => {
      expect(dashboardPage.getValueShowedForTotalSelectedBuyers()).toEqual(dashboardPage.getSumOfSelectedInvoiceValuesInBuyersList());
      done();
    });

    it('should have appropriate column names in Data Grid columns', done => {
      expect(dashboardPage.checkIfDataGridColumnsNamesOfBuyersListAsPerExpectation()).toBe(true);
      done();
    });

    it('....should click on search icon to open "Advnced Filter" panel', done => {

      done();
    });

    it('....should filter the list by a valid "Buyer Name" value', done => {

      done();
    });

    it('should click on "Cancel" button and back to Producer Dashboard', done => {
      expect(dashboardPage.clickOnCancelButtonFromBuyersListView()).toBe(true);
      done();
    });
  });

  describe('C115 - Choose Invoice - UI validation and back to Dashboard', () => {
    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should click on first enabled Fund USD/GBP/EUR button', done => {
      expect(dashboardPage.clickOnActiveFundButton()).toBe(true);
      done();
    });

    it('should click on top checkbox in buyer list', done => {
      dashboardPage.uncheckAllBuyersInList();
      expect(dashboardPage.getCountOfSelectedBuyersInList()).toBe(0);
      done();
    });

    it('should select top two buyers in buyer list', done => {
      dashboardPage.checkTopTwoBuyerInList();
      expect(dashboardPage.getCountOfSelectedBuyersInList()).toBeGreaterThanOrEqual(1);
      expect(dashboardPage.getCountOfSelectedBuyersInList()).toBeLessThanOrEqual(2);
      done();
    });

    it('should click "Next" button and load "Choose Invoices" UI', done => {
      expect(dashboardPage.clickNextButtonFromAvailabaleBuyersList()).toBe(true);
      done();
    });

    it('check if all invoices are selected', done => {
      expect(dashboardPage.getCountOfUnselectedInvoicesInList()).toBe(0);
      done();
    });

    it('check UI header text equals to "Available Invoices"', done => {
      expect(dashboardPage.getUiHeaderTextOfInvoiceList()).toEqual('Available Invoices');
      done();
    });

    it('check "Total Available (n)" value, where n should be equal to sum of all amounts in "Value" column', done => {
      expect(dashboardPage.getValueShowedForTotalAvailableInvoices()).toEqual(dashboardPage.getSumOfAllInvoiceValuesInInvoiceList());
      done();
    });

    it('check "Total Selected (n)" value, where n should be equal to sum of amounts in "Value" column only for selected invoices', done => {
      expect(dashboardPage.getValueShowedForTotalSelectedInvoices()).toEqual(dashboardPage.getSumOfSelectedInvoiceValuesInInvoiceList());
      done();
    });

    it('should have appropriate column names in Data Grid columns', done => {
      expect(dashboardPage.checkIfDataGridColumnsNamesOfInvoicesListAsPerExpectation()).toBe(true);
      done();
    });

    it('should click on "Cancel" button and back to Producer Dashboard', done => {
      expect(dashboardPage.clickOnCancelButtonFromInvoicesListView()).toBe(true);
      done();
    });

  });

  describe('C116 - View Offers - UI validation and back to Dashboard', () => {

    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should click on "View Offers" Button', done => {
      expect(dashboardPage.clickOnActiveViewOffersButton()).toBe(true);
      done();
    });

    it('check UI header text equals to "Open Offers"', done => {
      expect(dashboardPage.getUiHeaderTextOfViewOffersList()).toEqual('Open Offers');
      done();
    });

    it('should have appropriate column names in Data Grid columns', done => {
      expect(dashboardPage.checkIfDataGridColumnsNamesOfOpenOffersListAsPerExpectation()).toBe(true);
      done();
    });

    it('should click on "Producer Dashboard" from left Menu', done => {
      expect(dashboardPage.clickOnProducerDashboardFromLeftMenu()).toBe(true);
      done();
    });

  });

  describe('C117 - Bid deatails - UI validation and back to Dashboard', () => {

    beforeAll(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should click on enabled Currency of "USD/GBP/EUR"', done => {
      expect(dashboardPage.clickOnEnabledCurrencyButton()).toBe(true);
      done();
    });

    it('should display "Bids" at the left', done => {
      expect(dashboardPage.checkIfBidsDisplayedOnLeft()).toBeGreaterThan(0);
      done();
    });

    it('check if "Bid Details" contains Invoice, Purchase and Discount values', done => {
      expect(dashboardPage.checkIfBidDetailsContainsThreeSections()).toBe(true);
      done();
    });

    it('should click on "Cancel" button and return to Producer Dashboard', done => {
      expect(dashboardPage.clickOnCancelButtonFromBidDetailsUI()).toBe(true);
      done();
    });

  });

});
