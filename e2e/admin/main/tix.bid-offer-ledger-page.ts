import { browser, by, element, $, $$ } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { ElementUtil } from '../../utils/tix.element-util';
import { DashboardPage } from './tix.dashboard-page';

export class BidOfferLedgerPage {

    /***************    C129 - C130    ***************/

    /***************  UI validation  ****************/

    clickBidOfferIconAndcheckForPageLoad() {
        let dashboardPage: DashboardPage = new DashboardPage();

        var findElm = element.all(by.css('app-bid-offer data-grid .ledger thead tr th div:nth-child(1)'));
        var targetElment = element(by.css('md-sidenav-container navigation-menu a[href="/ledgers/bid-offers-ledger"]'));
        var findTxt = 'Asset Number';

        return dashboardPage.clickMenuIconAndCheckForPageLoad().then(() => {
            return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
                return StringUtil.checkIfAnElementExistsInAList(findElm, findTxt);
            });
        });
    }

    getBidOfferLedgerHeaderText() {
        return element(by.css('app-bid-offer h1')).getText().then((text) => {
            return text;
        });
    }

    getDataGridColumnItemList() {
        return element.all(by.css('app-bid-offer .padding-container data-grid .scroll-container table th div:nth-child(1)')).map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return texts;
        });
    }

    checkBidOfferDataGridColumnItemList() {
        let bid_offer_column_list = [
            'ID',
            'Date',
            'Type',
            'Asset Number',
            'Owner',
            'Currency',
            'Value',
            'BlkId'
            ];

        return this.getDataGridColumnItemList().then((elm) => {
            let bid_offer_col_item_list = [];
            bid_offer_col_item_list = elm;
            return StringUtil.checkIfTwoArraysContainSimilarElements(bid_offer_column_list, bid_offer_col_item_list);
        });
    }

    /*****************  Advance Filter Functionality validation  ****************/

    clickSearchIcon() {
        var findElm = element.all(by.css('tix-data-grid-filter #mainForm .title-row h3'));
        var targetElment = element(by.css('app-bid-offer data-grid .search-icon.padding-top md-icon'));
        var findTxt = 'Advanced Filter';

        return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
            return StringUtil.checkIfAnElementExistsInAList(findElm, findTxt);
        });
    }

    typeIDAndClickSearchNow() {
        return element.all(by.css('app-bid-offer data-grid .scroll-container tbody tr td:nth-child(1)')).then((elm) => {
            let txt = elm[0].getText();
            return element(by.css("#mainForm input[placeholder='ID']")).sendKeys(txt).then(() => {

                var findElm = element.all(by.css('app-bid-offer data-grid .scroll-container .ledger'));
                var targetElment = element(by.css('#mainForm .mat-raised-button.mat-primary'));
                return ElementUtil.waitForPageLoad(targetElment, findElm).then(() => {
                    return browser.sleep(500);
                });
            });
        });
    }

    checkAdvanceFilterWorks() {
        return this.clickSearchIcon().then(() => {
            return this.typeIDAndClickSearchNow().then(() => {
                return element.all(by.css('app-bid-offer data-grid .scroll-container tbody tr')).then((elm) => {
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