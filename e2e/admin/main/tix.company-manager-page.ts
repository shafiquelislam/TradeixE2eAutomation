import { browser, by, element, $, $$ } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { ElementUtil } from '../../utils/tix.element-util';
import { DashboardPage } from './tix.dashboard-page';

var data = require('../resources/tix.uat-config.json');

export class CompanyManagerPage {

    private dashboardPage: DashboardPage;

    /***************    C129 - C130    ***************/

    /***************  UI validation  ****************/
    constructor() {
        this.dashboardPage = new DashboardPage();
    }

    checkForCompanyManagerPageLoad() {

        var findElm = element.all(by.css('app-company-list data-grid .scroll-container thead tr th div:nth-child(1)'));
        var targetElment = element(by.css('md-sidenav-container navigation-menu a[href="/company-manager"]'));
        var findTxt = 'Duns Number';

        return this.dashboardPage.clickMenuIconAndCheckForPageLoad().then(() => {
            return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
                return StringUtil.checkIfElementExistsInList(findElm, findTxt);
            });
        });
    }

    getCompanyManagerHeaderText() {
        return element(by.css('app-company-list h1')).getText().then((text) => {
            return text;
        });
    }

    getDataGridColumnItemList() {
        return element.all(by.css('app-company-list .padding-container data-grid .scroll-container table th div:nth-child(1)')).map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return texts;
        });
    }

    checkCompanyManagerDataGridColumnItemList() {
        let company_manager_column_list = [
            'UniqueId',
            'Name',
            'Duns Number',
            'Reference',
            'Status',
            'Type(s)',
            ''
        ];

        return this.getDataGridColumnItemList().then((elm) => {
            let company_manager_col_item_list = [];
            company_manager_col_item_list = elm;
            return StringUtil.checkIfTwoArraysContainSimilarElements(company_manager_column_list, company_manager_col_item_list);
        });
    }

    checkForAddButton() {
        return element(by.css('app-company-list .padding-container .mat-raised-button.mat-primary')).isPresent().then((elm) => {
            return elm;
        });
    }

    /*****************  Add functionality validation  ****************/

    clickAddButtonToCreateCompany() {
        var findElm = element.all(by.css('app-company-detail form .mat-tab-body-wrapper div[ng-reflect-name="entityTypes"] md-checkbox .mat-checkbox-label'));
        var targetElment = element(by.css('app-company-list .padding-container .mat-raised-button.mat-primary'));
        var findTxt = 'Buyer';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfElementExistsInList(findElm, findTxt);
        });
    }

    clickSaveCompanyButton(company_value) {
        var findTxt = company_value['name'];

        return element(by.css('app-company-detail form .mat-tab-body-wrapper button')).click().then(() => {
            return browser.sleep(4000).then(() => {
                return element(by.css('app-company-detail > div:nth-child(1) h1')).getText().then((txt) => {
                    if (txt == findTxt) {
                        return true;
                    } else {
                        return false;
                    }
                });
            });
        });
    }

    clickBackButtonOfCreateCompanyPage() {
        var findElm = element.all(by.css('app-company-list h1'));
        var targetElment = element(by.css('app-company-detail .padding-container > button'));
        var findTxt = 'Companies';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return browser.sleep(1000).then(() => {
                return StringUtil.checkIfElementExistsInList(findElm, findTxt);
            });
        });
    }

    setCompanyFieldValue(comp_data) {
        element.all(by.css('app-company-detail form input[id^="md-input-"]:not([type="date"])')).each((elm) => {
            elm.getAttribute('ng-reflect-name').then((fieldName) => {
                if (comp_data[fieldName] != "") {
                    var locator = 'app-company-detail form .mat-input-container input[ng-reflect-name="' + fieldName + '"]';
                    var elmnt = element(by.css(locator));
                    elmnt.sendKeys(comp_data[fieldName]);
                    browser.sleep(50);
                }
            });
        });
    }

    clickCompanyCheckBoxes(comp_checkbox_data) {
        let checkboxDoms = element.all(by.css('[for^="input-md-checkbox-"]'));
        
        checkboxDoms.each(element => {
            element.getText().then(text => {
                let value = comp_checkbox_data[text];
                if (value) {
                    element.click();
                    browser.sleep(50);
                }
            });
        });
    }

    createCompany() {
        let all_company_field_data = data.company.create.fieldData;
        let all_company_checkbox_data = data.company.create.checkBoxData;

        return this.clickAddButtonToCreateCompany().then((elm) => {
            if (elm == true) {
                this.setCompanyFieldValue(all_company_field_data[0]);
                this.clickCompanyCheckBoxes(all_company_checkbox_data[0]);

                return this.clickSaveCompanyButton(all_company_field_data[0]).then(() => {
                    return this.clickBackButtonOfCreateCompanyPage();
                });
            }
        });
    }

    checkCreatedCompanyAddedInCompanyList() {
        let search_item = data.company.create.fieldData[0];
        let Elment = element.all(by.css('app-company-list data-grid table tbody tr td:nth-child(1)'));

        return StringUtil.checkIfElementExistsInList(Elment, search_item["uniqueId"]);
    }

    /*****************  Edit Functionality validation  ****************/

    clickFirstCompanyEditButton() {
        var findElm = element.all(by.css('app-company-detail form .mat-tab-body-wrapper div[ng-reflect-name="entityTypes"] md-checkbox .mat-checkbox-label'));
        var targetElment = element.all(by.css('app-company-list .padding-container data-grid .scroll-container table tbody .align-right button')).get(0);
        var findTxt = 'Buyer';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfElementExistsInList(findElm, findTxt);
        });
    }

    updateCompanyFieldValue(update_field_data) {
        element.all(by.css('app-company-detail form input[id^="md-input-"]:not([type="date"])')).each((elm) => {
            elm.getAttribute('ng-reflect-name').then((fieldName) => {
                if (update_field_data[fieldName] != "") {
                    var locator = 'app-company-detail form .mat-input-container input[ng-reflect-name="' + fieldName + '"]';
                    var elmnt = element(by.css(locator));
                    elmnt.clear().then(() => {
                        browser.sleep(50).then(() => {
                            elmnt.sendKeys(update_field_data[fieldName]);
                        });
                    });
                }
            });
        });
    }

    updateCompanyCheckbox(update_checkbox_data) {
        let checkboxDoms = element.all(by.css('.mat-checkbox.mat-checkbox-checked [for^="input-md-checkbox-"]'));

        checkboxDoms.each((element) => {
            element.click();
            browser.sleep(50);
        }).then(() => {
            this.clickCompanyCheckBoxes(update_checkbox_data);
        });
    }

    checkCompanyUpdatedInCompanyList() {
        let search_item = data.company.update.fieldData.name;
        let Elment = element.all(by.css('app-company-list data-grid table tbody tr td:nth-child(2)'));

        return StringUtil.checkIfElementExistsInList(Elment, search_item);
    }

    updateFirstCompany() {
        let company_field_update_data = data.company.update.fieldData;
        let company_checkbox_update_data = data.company.update.checkBoxData;

        return this.clickFirstCompanyEditButton().then(() => {
            this.updateCompanyFieldValue(company_field_update_data);
            this.updateCompanyCheckbox(company_checkbox_update_data);

            return this.clickSaveCompanyButton(company_field_update_data).then(() => {
                return this.clickBackButtonOfCreateCompanyPage();
            });
        });
    }


    /*****************  Advance Filter Functionality validation  ****************/

    clickSearchIcon() {
        var findElm = element.all(by.css('tix-data-grid-filter #mainForm .title-row h3'));
        var targetElment = element(by.css('app-company-list data-grid .search-icon.padding-top md-icon'));
        var findTxt = 'Advanced Filter';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfElementExistsInList(findElm, findTxt);
        });
    }

    typeIDAndClickSearchNow() {
        return element.all(by.css('app-company-list data-grid .scroll-container tbody tr td:nth-child(1)')).then((elm) => {
            let txt = elm[0].getText();
            return element(by.css("#mainForm input[placeholder='UniqueId']")).sendKeys(txt).then(() => {

                var findElm = element.all(by.css('app-company-list data-grid .scroll-container tbody tr'));
                var targetElment = element(by.css('#mainForm .mat-raised-button.mat-primary'));
                return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
                    return browser.sleep(500);
                });
            });
        });
    }

    checkIfAdvanceFilterWorks() {
        return this.clickSearchIcon().then(() => {
            return this.typeIDAndClickSearchNow().then(() => {
                return element.all(by.css('app-company-list data-grid .scroll-container tbody tr')).then((elm) => {
                    if (elm.length > 0) {
                        console.log('Search element is found');
                        return true;
                    } else {
                        element(by.css('app-company-list data-grid .no-rows-message h3')).isPresent().then((resp) => {
                            console.log('Search element is not found');
                            return resp;
                        });
                    }
                });
            });
        });
    }

    resetPage() {
        return this.clickSearchIcon().then(() => {
            var targetElment = element(by.css('#mainForm button:nth-child(2)'));
            var findElm = element.all(by.css('app-company-list data-grid .scroll-container tbody tr'));
            return ElementUtil.waitForPageLoad(targetElment, findElm).then((resp) => {
                return browser.sleep(3000).then(() => {
                    return resp;
                });
            });
        });
    }
}

