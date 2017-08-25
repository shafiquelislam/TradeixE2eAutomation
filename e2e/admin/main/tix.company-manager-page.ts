import { browser, by, element, $, $$ } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { DashboardPage } from './tix.dashboard-page';

var data = require('../resources/tix.uat-config.json');

export class CompanyManagerPage {

    /***************    C129 - C130    ***************/

    /***************  UI validation  ****************/

    clickCompanyManagerIcon() {
        return element(by.css('md-sidenav-container navigation-menu a[href="/company-manager"]')).click()
        .then(() => {
            browser.sleep(8000).then(() => {
                return true;
            });
        });
    }

    hasCompanyManagerUniqueText() {
        let dashboardPage = new DashboardPage();
        return dashboardPage.clickMenuButton().then(() => {
            return this.clickCompanyManagerIcon().then(() => {
                return element(by.xpath('//div[contains(text(),"Duns Number")]')).isPresent().then((elm) => {
                    return elm;
                });
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

    checkForAddButton () {
        return element(by.css('app-company-list .padding-container .mat-raised-button.mat-primary')).isPresent().then((elm) => {
            return elm;
        });
    }

    /*****************  Add functionality validation  ****************/

    clickAddButtonToCreateCompany() {
        return element(by.css('app-company-list .padding-container .mat-raised-button.mat-primary')).click()
        .then(() => {
            return element(by.css('app-company-detail .padding-container h1')).getText().then((elm) => {
                browser.sleep(1000);
                if(elm == 'Create Company'){
                    return true;
                }
                else{
                    return false;
                }
            });
        });
    }

    clickSaveCompanyButton() {
        return element(by.css('app-company-detail form .mat-tab-body-wrapper button')).click().then(() => {
            return browser.sleep(3000).then(() => {
                return true;
            });
        });
    }

    clickBackButtonOfCreateCompanyPage() {
        return element(by.css('app-company-detail .padding-container > button')).click().then(() => {
           return browser.sleep(2000).then(() => {
                return true;
            });
        });
    }

    setCompanyFieldValue(comp_data) {
         let comp_field_name = [
            "uniqueId",
            "name",
            "dunsNumber",
            "reference",
            "merchantId",
            "regNumber",
            "taxId",
            "websiteUrl",
            "sicCode",
            "LEI",
            "networkId",
            "originationNetwork",
            "lastSanctionCheckDate"
         ]

        comp_field_name.forEach((fieldName) => {
            if(comp_data[fieldName] != ""){
                var locator = 'app-company-detail form .mat-input-container input[ng-reflect-name="' + fieldName + '"]';
                var elm = element(by.css(locator));
                elm.sendKeys(comp_data[fieldName]);
                browser.sleep(1000);
            }
        });
    }

    clickCompanyCheckBoxes(comp_checkbox_data) {
        let comp_checkbox_name = [
            "Is Active",
            "On-boarded",
            "Sanctions Check",
            "Last Sanction Check Approved",
            "Referred",
            "Buyer",
            "Supplier",
            "Funder",
            "Settlement Network",
            "Insurance Underwriter",
            "Regulator",
            "B2B Network",
            "Servicer",
            "Test999"
        ]

        comp_checkbox_name.forEach((fieldName) => {
            if(comp_checkbox_data[fieldName] == true){
                var locator = '//app-company-detail //form //md-checkbox //span[contains(text(),"' + fieldName + '")]';
                var elm = element(by.xpath(locator));
                elm.click();
                browser.sleep(1000);
            }
        });
    }

    createCompany() {
        let all_company_field_data = data.company.create.fieldData;
        let all_company_checkbox_data = data.company.create.checkBoxData;
        
        return this.clickAddButtonToCreateCompany().then((elm) => {
            if(elm == true){
                this.setCompanyFieldValue(all_company_field_data[0]);
                this.clickCompanyCheckBoxes(all_company_checkbox_data[0]);

                return this.clickSaveCompanyButton().then(() => {
                    browser.sleep(2000);
                    return this.clickBackButtonOfCreateCompanyPage();
                });
            }
        });
    }

    checkCreatedCompanyAddedInCompanyList() {
        let all_company_uniqueId_list = [];
        return element.all(by.css('app-company-list data-grid table tbody tr td:nth-child(1)')).array.forEach(elm => {
            return all_company_uniqueId_list.push(elm.getText());
        }).then(() => {
            console.log(all_company_uniqueId_list);
            
        });

    }

    /*****************  Edit Functionality validation  ****************/

    clickFirstCompanyEditButton() {
        return element.all(by.css('app-company-list .padding-container data-grid .scroll-container table tbody .align-right button')).get(0)
        .click().then(() => {
            return browser.sleep(4000).then(() => {
                return true;
            });
        });
    }

    updateFirstCompany() {
        this.clickFirstCompanyEditButton().then(() => {
            
        });
        
    }


    /*****************  Advance Filter Functionality validation  ****************/

    clickSearchIcon() {
        return element(by.css('.padding-container data-grid .search-icon.padding-top .mat-icon.material-icons'))
        .click()
        .then(() => {
            return browser.sleep(1000);
        });
    }

    typeIDAndClickSearchNow() {
        return element.all(by.css('app-bid-offer data-grid .scroll-container tbody tr td')).then((elm) => {
            let txt = elm[0].getText();
            return element(by.css('#mainForm #md-input-1')).sendKeys(txt).then(() => {
                return element(by.css('#mainForm .mat-raised-button.mat-primary')).click()
                .then(() => {
                    return browser.sleep(1000);
                });
            });
        });
    }

    checkAdvanceFilterWorks() {
        return this.clickSearchIcon().then(() => {
            return this.typeIDAndClickSearchNow().then(() => {
                return element.all(by.css('app-bid-offer data-grid .scroll-container tbody tr')).then((elm) => {
                    if(elm.length > 0){
                        return true;
                    }else{
                        return false;
                    }
                });
            });
        });
    }

}

