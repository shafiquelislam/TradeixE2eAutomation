import { browser, by, element, $, $$, ExpectedConditions, protractor } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { ElementUtil } from '../../utils/tix.element-util';

export class InvoiceLedgerPage {

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
    
    clickInvoiceLedgerIconAndCheckForPageLoad() {
        var findElm = element.all(by.css('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)'));
        var targetElment = element(by.css('md-sidenav-container navigation-menu a[href="/ledgers/invoices-ledger"]'));
        var findTxt = 'Buyer Name';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfAnElementExistsInAList(findElm, findTxt);
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

    clickAuditTabAndcheckForPageLoad() {
        var findElm = element.all(by.css('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)'));
        var targetElment = element(by.css('.mat-tab-labels #md-tab-label-0-1'));
        var findTxt = 'Blockchain';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfAnElementExistsInAList(findElm, findTxt);
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

    clickVersionTabAndcheckForPageLoad() {
        var findElm = element.all(by.css('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)'));
        var targetElment = element(by.css('.mat-tab-labels #md-tab-label-0-2'));
        var findTxt = 'Invoice Version';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfAnElementExistsInAList(findElm, findTxt);
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

    vlickTradeTabAndcheckForPageLoad() {
        var findElm = element.all(by.css('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)'));
        var targetElment = element(by.css('.mat-tab-labels #md-tab-label-0-3'));
        var findTxt = 'Trade Date';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfAnElementExistsInAList(findElm, findTxt);
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

    clickInsuranceTabAndcheckForPageLoad() {
        var findElm = element.all(by.css('app-invoice-ledger data-grid .ledger thead tr th div:nth-child(1)'));
        var targetElment = element(by.css('.mat-tab-labels #md-tab-label-0-4'));
        var findTxt = 'Insurance Amount';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfAnElementExistsInAList(findElm, findTxt);
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
        var findElm = element.all(by.css('tix-data-grid-filter #mainForm .title-row h3'));
        var targetElment = element(by.css('app-invoice-ledger data-grid .search-icon.padding-top md-icon'));
        var findTxt = 'Advanced Filter';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfAnElementExistsInAList(findElm, findTxt);
        });
    }

    typeInoviceNumberAndClickSearchNow() {
        return element.all(by.css('app-invoice-ledger data-grid .scroll-container tbody strong')).then((elm) => {
            let txt = elm[0].getText();
            return element(by.css("#mainForm input[placeholder='Invoice Number']")).sendKeys(txt).then(() => {
                var findElm = element.all(by.css('app-invoice-ledger data-grid .scroll-container tbody strong'));
                var targetElment = element(by.css('#mainForm .mat-raised-button.mat-primary'));
                return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
                    return browser.sleep(500);
                });
            });
        });
    }

    checkAdvanceFilterWorks() {
        return this.clickSearchIcon().then(() => {
            return this.typeInoviceNumberAndClickSearchNow().then(() => {
                return element.all(by.css('app-invoice-ledger data-grid .scroll-container tbody tr')).then((elm) => {
                    if(elm.length > 0){
                        console.log('Search element is found');
                        return true;
                    }else{
                        element(by.css('app-invoice-ledger data-grid .no-rows-message h3')).isPresent().then((resp) => {
                            console.log('Search element is not found');
                            return resp;
                        });
                    }
                });
            });
        });
    }

}