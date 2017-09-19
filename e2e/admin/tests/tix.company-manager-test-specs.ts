import { browser } from 'protractor';
import { CompanyManagerPage } from '../main/tix.company-manager-page';

var globalConfig = require("../../tix.global-config.json");


describe('C133-C136 Admin panel Company Manager validation', () => {

    var defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

    afterEach(() => {
        browser.sleep(defaultSpecDelayTime);
    });

    let companyManagerPage = new CompanyManagerPage();

    describe('C133 - UI validation', () => {

        it('should load Company Manager ledger page on clicking Company Manager Icon', (done) => {
            expect(companyManagerPage.clickCompanyManagerIconAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display "Companies" as header text', (done) => {
            expect(companyManagerPage.getCompanyManagerPageHeaderText()).toEqual('Companies');
            done();
        });

        it('should display "Company manager" table column names', (done) => {
            expect(companyManagerPage.checkCompanyManagerPageTableColumnNames()).toBe(true);
            done();
        });

        it('should display "Add" button on top-right corner', (done) => {
            expect(companyManagerPage.checkIfAddButtonExists()).toBe(true);
            done();
        });

    });


    describe('C134 - Add functionality validation', () => {

        it('should create a company', (done) => {
            expect(companyManagerPage.createCompany()).toBe(true);
            done();
        });

        it('should add the newly created company in company list', (done) => {
            expect(companyManagerPage.checkIfCreatedCompanyAddedInCompanyList()).toBe(true);
            done();
        });

    });

    describe('C135 - Edit functionality validation', () => {

        it('should edit a company data', (done) => {
            expect(companyManagerPage.updateFirstCompany()).toBe(true);
            done();
        });

        it('should add the updated company in company list', (done) => {
            expect(companyManagerPage.checkIfCompanyUpdatedInCompanyList()).toBe(true);
            done();
        });

    });

    describe('C136 - Advance Filter functionality validation', () => {

        it('should display search data in search result', (done) => {
            expect(companyManagerPage.checkIfAdvanceFilterWorks()).toBe(true);
            done();
        });

        it('should reset the page after search', (done) => {
            expect(companyManagerPage.resetPage()).toBe(true);
            done();
        });

    });

});