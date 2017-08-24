import { browser, by, element, $, $$ } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';

export class InvoiveLedgerPage {

    /***************    C123 - C128    ***************/

    /***************     Common     **************/

    getDataGridColumnItemList() {
        return element.all(by.css('app-invoice-ledger data-grid .scroll-container table thead tr th div:nth-child(1)')).map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return texts;
        });
    }

    /***************** invoice tab *****************/
    
    clickInvoiceLedgerIcon() {
        return element(by.css('md-sidenav-container navigation-menu a[href="/ledgers/invoices-ledger"]')).click()
        .then(() => {
            return browser.sleep(10000);
        });
    }

    getInvoiceLedgerTabList() {
        return element.all(by.css('app-invoice-ledger md-tab-group md-tab-header .mat-tab-labels .mat-tab-label.mat-ripple')).map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return texts;
        });
    }

    getInvoiceLedgerHeaderText() {
        return element(by.css('app-invoice-ledger h1')).getText()
        .then((text) => {
            return text;
        });
    }

    getDefaultTabText() {
        return element(by.css('app-invoice-ledger md-tab-group md-tab-header .mat-tab-labels .mat-tab-label.mat-ripple.mat-tab-label-active'))
        .getText().then((elm) => {
            return elm;
        })
    }

    hasInvoiceTabPageUniqueText() {
        return element(by.xpath('//div[contains(text(),"Invoice Payments")]')).isPresent()
        .then((elm) => {
            return elm;
        });
    }

    checkInvoiceLedgerTabList() {
        let tab_list = [
            'Invoice', 
            'Audit', 
            'Version', 
            'Trade', 
            'Insurance'
            ];

        return this.getInvoiceLedgerTabList().then((elm) => {
            let tab_name_list = [];
            tab_name_list = elm;
            return StringUtil.checkIfTwoArraysContainSimilarElements(tab_list, tab_name_list);
        });
    }

    checkInvoiceDataGridColumnItemList() {
        let invoice_column_list = [
            'Invoice Number',
            'Invoice Type',
            'Invoice Date',
            'Supplier Name',
            'Buyer Name',
            'Owner Name',
            'CCY',
            'Reference',
            'Payment Due Date',
            'Cancelled',
            'Close Date',
            'Site ID',
            'Invoice Payments',
            'Invoice Dilutions',
            'Total Outstanding',
            'Invoice Value'
            ];

        return this.getDataGridColumnItemList().then((elm) => {
            let inv_col_item_list = [];
            inv_col_item_list = elm;
            return StringUtil.checkIfTwoArraysContainSimilarElements(invoice_column_list, inv_col_item_list);
        });
    }


    /**************** Audit tab ******************/

    clickAuditTab() {
        return element(by.css('.mat-tab-labels #md-tab-label-0-1')).click()
        .then(() => {
            return browser.sleep(1500);
        })
    }

    hasAuditTabPageUniqueText() {
        return element(by.xpath('//div[contains(text(),"Blockchain")]')).isPresent()
        .then((elm) => {
            return elm;
        });
    }

    checkAuditDataGridColumnItemList() {
        let audit_column_list = [
            'Invoice Number',
            'Document Created',
            'Document Submitted',
            'Document Confirmed',
            'Document Key',
            'User ID',
            'Block ID',
            'Blockchain',
            'Supersede ID',
            'originationNetwork',
            'Hash'
        ]

        return this.getDataGridColumnItemList().then((elm) => {
            let audit_col_item_list = [];
            audit_col_item_list = elm;
            return StringUtil.checkIfTwoArraysContainSimilarElements(audit_column_list, audit_col_item_list);
        });
    }

    /***************   Version tab   *****************/

    clickVersionTab() {
        return element(by.css('.mat-tab-labels #md-tab-label-0-2')).click()
        .then(() => {
            return browser.sleep(1500);
        })
    }

    hasVersionTabPageUniqueText() {
        return element(by.xpath('//div[contains(text(),"Invoice Version")]')).isPresent()
        .then((elm) => {
            return elm;
        });
    }

    checkVersionDataGridColumnItemList() {
        let version_column_list = [
            'Invoice Number',
            'Network Invoice UID',
            'Invoice Version',
            'Invoice Version Date'
        ]

        return this.getDataGridColumnItemList().then((elm) => {
            let version_col_item_list = [];
            version_col_item_list = elm;
            return StringUtil.checkIfTwoArraysContainSimilarElements(version_column_list, version_col_item_list);
        });
    }

    /****************  Trade Tab  *****************/

    clickTradeTab() {
        return element(by.css('.mat-tab-labels #md-tab-label-0-3')).click()
        .then(() => {
            return browser.sleep(1500);
        })
    }

    hasTradeTabPageUniqueText() {
        return element(by.xpath('//div[contains(text(),"Trade Date")]')).isPresent()
        .then((elm) => {
            return elm;
        });
    }

    checkTradeDataGridColumnItemList() {
        let trade_column_list = [
            'Invoice Number',
            'Retention',
            'Mandatory Reconciliation Date',
            'Settlement Date',
            'Trade Date',
            'Trade Payment Date',
            'Tenor Due Days Remaining',
            'Margin',
            'Transaction Fee',
            'Base Rate',
            'Total Discount Costs',
            'Invoice Purchase Value',
            'Eligible Value'
        ]

        return this.getDataGridColumnItemList().then((elm) => {
            let trade_col_item_list = [];
            trade_col_item_list = elm;
            return StringUtil.checkIfTwoArraysContainSimilarElements(trade_column_list, trade_col_item_list);
        });
    }

    /*************** Insurance Tab *****************/

    clickInsuranceTab() {
        return element(by.css('.mat-tab-labels #md-tab-label-0-4')).click()
        .then(() => {
            return browser.sleep(1500);
        })
    }

    hasInsuranceTabPageUniqueText() {
        return element(by.xpath('//div[contains(text(),"Insurance Expiry Date")]')).isPresent()
        .then((elm) => {
            return elm;
        });
    }

    checkInsuranceDataGridColumnItemList() {
        let insurance_column_list = [
            'Invoice Number',
            'Endorsement ID',
            'Endorsement Date',
            'Insurance Amount',
            'Insurance Currency',
            'Insurance Expiry Date',
            'Slip ID',
            'Insurance Reference',
            'Policy Number'
        ]

        return this.getDataGridColumnItemList().then((elm) => {
            let insurance_col_item_list = [];
            insurance_col_item_list = elm;
            return StringUtil.checkIfTwoArraysContainSimilarElements(insurance_column_list, insurance_col_item_list);
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

    typeInoviceNumberAndClickSearchNow() {
        return element.all(by.css('app-invoice-ledger data-grid .scroll-container tbody strong')).then((elm) => {
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
            return this.typeInoviceNumberAndClickSearchNow().then(() => {
                return element.all(by.css('app-invoice-ledger data-grid .scroll-container tbody tr')).then((elm) => {
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