import { browser } from 'protractor';
import { DashboardPage } from '../main/tix.dashboard-page';
import { InvoiceLedgerPage } from '../main/tix.invoice-ledger-page';
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


  describe('C123-C128 - Invoice Ledger validation', () => {

    let invoiceLedgerPage: InvoiceLedgerPage = new InvoiceLedgerPage();

    describe('C123 - Invoice tab UI validation', () => {

        it('should load Invoice page on clicking invoice ledger icon', (done) => {
            expect(invoiceLedgerPage.clickInvoiceLedgerIconAndCheckForPageLoad()).toBe(true);
            done();
        });

        it('should display all invoice ledger tabs', (done) => {
            expect(invoiceLedgerPage.checkInvoiceLedgerTabList()).toBe(true);
            done();
        });

        it('should varify Invoice as only default tab', (done) => {
            invoiceLedgerPage.getDefaultTabText().then((elm) => {
                expect(elm).toEqual('Invoice');
                expect(elm).not.toEqual('Audit');
                expect(elm).not.toEqual('Version');
                expect(elm).not.toEqual('Trade');
                expect(elm).not.toEqual('Insurance');
            });
            done();
        });

        it('should display "Invoice Ledger" as header text', (done) => {
            expect(invoiceLedgerPage.getInvoiceLedgerHeaderText()).toEqual('Invoice Ledger');
            done();
        });

        it('should display Invoice data grid column names', (done) => {
            expect(invoiceLedgerPage.checkInvoiceDataGridColumnItemList()).toEqual(true);
            done();
        });

    });


    describe('C124 - Audit tab UI validation', () => {

        it('should load Audit page on clicking Audit tab', (done) => {
            expect(invoiceLedgerPage.clickAuditTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display Audit data grid column names', (done) => {
            expect(invoiceLedgerPage.checkAuditDataGridColumnItemList()).toBe(true);
            done();
        });

    });


    describe('C125 - Version tab UI validation', () => {

        it('should load Version page on clicking Version tab', (done) => {
              expect(invoiceLedgerPage.clickVersionTabAndcheckForPageLoad()).toBe(true);
              done();
        });

        it('should display Version data grid column names', (done) => {
            expect(invoiceLedgerPage.checkVersionDataGridColumnItemList()).toBe(true);
            done();
        });

    });


    describe('C126 - Trade tab UI validation', () => {

        it('should load Trade page on clicking Trade tab', (done) => {
              expect(invoiceLedgerPage.clickTradeTabAndcheckForPageLoad()).toBe(true);
              done();
        });

        it('should display Trade data grid column names', (done) => {
            expect(invoiceLedgerPage.checkTradeDataGridColumnItemList()).toBe(true);
            done();
        });

    });


    describe('C127 - Insurance tab UI validation', () => {

        it('should load Insurace page on clicking Inusrance tab', (done) => {
            expect(invoiceLedgerPage.clickInsuranceTabAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display Insurance data grid column names', (done) => {
            expect(invoiceLedgerPage.checkInsuranceDataGridColumnItemList()).toBe(true);
            done();
        });

    });

    describe('C128 - Advance Filter functionality validation', () => {

        it('should display search data in search result', (done) => {
            expect(invoiceLedgerPage.checkIfAdvanceFilterWorks()).toBe(true);
            done();
        });

    });
    

  });


  describe('C129-C130 Bid/Offer ledger validation', () => {

    let bidOfferLedgerPage = new BidOfferLedgerPage();

    describe('C129 - UI validation', () => {

        it('should load bid/offer ledger page on clicking Bid Offer Ledger Icon', (done) => {
            expect(bidOfferLedgerPage.clickBidOfferIconAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display "Bid/Offer Ledger" as header text', (done) => {
            expect(bidOfferLedgerPage.getBidOfferLedgerHeaderText()).toEqual('Bid/Offer Ledger');
            done();
        });

        it('should display "Bid/Offer Ledger" grid column names', (done) => {
            expect(bidOfferLedgerPage.checkBidOfferDataGridColumnItemList()).toBe(true);
            done();
        });

    });


    describe('C130 - Advance Filter functionality validation', () => {

        it('should display search data in search result', (done) => {
            expect(bidOfferLedgerPage.checkIfAdvanceFilterWorks()).toBe(true);
            done();
        });

    });

  });


  describe('C133-C136 Company Manager validation', () => {

    let companyManagerPage = new CompanyManagerPage();

    describe('C133 - UI validation', () => {

        it('should load Company Manager ledger page on clicking Company Manager Icon', (done) => {
            expect(companyManagerPage.checkForCompanyManagerPageLoad()).toBe(true);
            done();
        });

        it('should display "Companies" as header text', (done) => {
            expect(companyManagerPage.getCompanyManagerHeaderText()).toEqual('Companies');
            done();
        });

        it('should display "Company manager" grid column names', (done) => {
            expect(companyManagerPage.checkCompanyManagerDataGridColumnItemList()).toBe(true);
            done();
        });

        it('should display "Add" button on top-right corner', (done) => {
            expect(companyManagerPage.checkForAddButton()).toBe(true);
            done();
        });

    });


    describe('C134 - Add functionality validation', () => {

        it('should create a company', (done) => {
            expect(companyManagerPage.createCompany()).toBe(true);
            done();
        });

        it('should add the newly created company in company list', (done) => {
            expect(companyManagerPage.checkCreatedCompanyAddedInCompanyList()).toBe(true);
            done();
        });

    });

    describe('C135 - Edit functionality validation', () => {

        it('should edit a company data', (done) => {
            expect(companyManagerPage.updateFirstCompany()).toBe(true);
            done();
        });

        it('should add the updated company in company list', (done) => {
            expect(companyManagerPage.checkCompanyUpdatedInCompanyList()).toBe(true);
            done();
        });

    });

    describe('C136 - Advance Filter functionality validation', () => {

        it('should display search data in search result', (done) => {
            expect(companyManagerPage.checkIfAdvanceFilterWorks()).toBe(true);
            done();
        });

    });

  });

});