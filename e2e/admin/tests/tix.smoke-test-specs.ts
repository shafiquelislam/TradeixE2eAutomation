import { browser } from 'protractor';
import { DashboardPage } from '../main/tix.dashboard-page';
import { InvoiveLedgerPage } from '../main/tix.invoice-ledger-page';
import { BidOfferLedgerPage } from '../main/tix.bid-offer-ledger-page';
import { CompanyManagerPage } from '../main/tix.company-manager-page';

var globalConfig = require("../../tix.global-config.json");

describe('Admin Panel smoke test', () => {

  var defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

  afterEach(() => {
    browser.sleep(defaultSpecDelayTime);
  });


  describe('C122 - Home Dashboard UI and Left Menu functionality validation', () => {

    let dashboardPage: DashboardPage = new DashboardPage();

    afterEach(() => {
      browser.sleep(defaultSpecDelayTime);
    });

    it('should display tradeix logo', () =>  {
      expect(dashboardPage.hasTradeIxLogo()).toBe(true);
    });

    it('should display Menu Icon', () => {
        expect(dashboardPage.hasMenuIcon()).toBe(true);
    });

    it('should display Profile Icon', () => {
        expect(dashboardPage.hasProfileIcon()).toBe(true);
    });

    it('should check whether menu items are present or not', () => {
        dashboardPage.clickMenuButton().then(() => {
            expect(dashboardPage.checkMenuItemist()).toBe(true);
        });
    });

  });


  describe('C123-C128 - Invoice Ledger validation', () => {

    let invoiveLedgerPage: InvoiveLedgerPage = new InvoiveLedgerPage();

    describe('C123 - Invoice tab UI validation', () => {

        it('should load Invoice page on clicking invoice ledger icon', () => {
            invoiveLedgerPage.clickInvoiceLedgerIcon().then(() => {
              expect(invoiveLedgerPage.hasInvoiceTabPageUniqueText()).toBe(true);
            });

        });

        it('should display all invoice ledger tabs', () => {
            expect(invoiveLedgerPage.checkInvoiceLedgerTabList()).toBe(true);
        });

        it('should varify Invoice as only default tab', () => {
            invoiveLedgerPage.getDefaultTabText().then((elm) => {
                expect(elm).toEqual('Invoice');
                expect(elm).not.toEqual('Audit');
                expect(elm).not.toEqual('Version');
                expect(elm).not.toEqual('Trade');
                expect(elm).not.toEqual('Insurance');
            });
        });

        it('should display "Invoice Ledger" as header text', () => {
            expect(invoiveLedgerPage.getInvoiceLedgerHeaderText()).toEqual('Invoice Ledger');
        });

        it('should display Invoice data grid column names', () => {
            expect(invoiveLedgerPage.checkInvoiceDataGridColumnItemList()).toEqual(true);
        });

    });


    describe('C124 - Audit tab UI validation', () => {

        it('should load Audit page on clicking Audit tab', () => {
            invoiveLedgerPage.clickAuditTab().then(() => {
              expect(invoiveLedgerPage.hasAuditTabPageUniqueText()).toBe(true);
            });
        });

        it('should display Audit data grid column names', () => {
            expect(invoiveLedgerPage.checkAuditDataGridColumnItemList()).toBe(true);
        });

    });


    describe('C125 - Version tab UI validation', () => {

        it('should load Version page on clicking Version tab', () => {
            invoiveLedgerPage.clickVersionTab().then(() => {
              expect(invoiveLedgerPage.hasVersionTabPageUniqueText()).toBe(true);
            });
        });

        it('should display Version data grid column names', () => {
            expect(invoiveLedgerPage.checkVersionDataGridColumnItemList()).toBe(true);
        });

    });


    describe('C126 - Trade tab UI validation', () => {

        it('should load Trade page on clicking Trade tab', () => {
            invoiveLedgerPage.clickTradeTab().then(() => {
              expect(invoiveLedgerPage.hasTradeTabPageUniqueText()).toBe(true);
            });
        });

        it('should display Trade data grid column names', () => {
            expect(invoiveLedgerPage.checkTradeDataGridColumnItemList()).toBe(true);
        });

    });


    describe('C127 - Insurance tab UI validation', () => {

        it('should load Insurace page on clicking Inusrance tab', () => {
            invoiveLedgerPage.clickInsuranceTab().then(() => {
              expect(invoiveLedgerPage.hasInsuranceTabPageUniqueText()).toBe(true);
            });
        });

        it('should display Insurance data grid column names', () => {
            expect(invoiveLedgerPage.checkInsuranceDataGridColumnItemList()).toBe(true);
        });

    });

    describe('C128 - Advance Filter functionality validation', () => {

        it('should display search data in search result', () => {
            expect(invoiveLedgerPage.checkAdvanceFilterWorks()).toBe(true);
        });

    });
    

  });


  describe('C129-C130 Bid/Offer ledger validation', () => {

    let bidOfferLedgerPage = new BidOfferLedgerPage();

    describe('C129 - UI validation', () => {

        it('should load bid/offer ledger page', () => {
            expect(bidOfferLedgerPage.hasBidOfferLedgerUniqueText()).toBe(true);
        });

        it('should display "Bid/Offer Ledger" as header text', () => {
            expect(bidOfferLedgerPage.getBidOfferLedgerHeaderText()).toEqual('Bid/Offer Ledger');
        });

        it('should display "Bid/Offer Ledger" grid column names', () => {
            expect(bidOfferLedgerPage.checkBidOfferDataGridColumnItemList()).toBe(true);
        });

    });


    describe('C130 - Advance Filter functionality validation', () => {

        it('should display search data in search result', () => {
            expect(bidOfferLedgerPage.checkAdvanceFilterWorks()).toBe(true);
        });

    });

  });


  describe('C133-C136 Company Manager validation', () => {

    let companyManagerPage = new CompanyManagerPage();

    describe('C133 - UI validation', () => {

        it('should load Company Manager ledger page', () => {
            expect(companyManagerPage.hasCompanyManagerUniqueText()).toBe(true);
        });

        it('should display "Companies" as header text', () => {
            expect(companyManagerPage.getCompanyManagerHeaderText()).toEqual('Companies');
        });

        it('should display "Company manager" grid column names', () => {
            expect(companyManagerPage.checkCompanyManagerDataGridColumnItemList()).toBe(true);
        });

        it('should display "Add" button on top-right corner', () => {
            expect(companyManagerPage.checkForAddButton()).toBe(true);
        });

    });


    describe('C134 - Add functionality validation', () => {

        it('should create a company data', () => {
            expect(companyManagerPage.createCompany()).toBe(true);
        });

    });

  });


});