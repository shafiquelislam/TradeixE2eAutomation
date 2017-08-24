import { browser, by, element, $, $$ } from 'protractor';
import { StringUtil } from '../../utils/tix.string-util';
import { DashboardPage } from './tix.dashboard-page';

export class BidOfferLedgerPage {

    /***************    C129 - C130    ***************/

    /***************  UI validation  ****************/

    clickBidOfferLedgerIcon() {
        return element(by.css('md-sidenav-container navigation-menu a[href="/ledgers/bid-offers-ledger"]')).click()
        .then(() => {
            return browser.sleep(5000);
        });
    }

    hasBidOfferLedgerUniqueText() {
        let dashboardPage = new DashboardPage();
        return dashboardPage.clickMenuButton().then(() => {
            return this.clickBidOfferLedgerIcon().then(() => {
                return element(by.xpath('//div[contains(text(),"Asset Number")]')).isPresent().then((elm) => {
                    return elm;
                });
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