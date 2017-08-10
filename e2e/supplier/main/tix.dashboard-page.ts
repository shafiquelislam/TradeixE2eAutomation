import { browser, by, element } from 'protractor';
import { NumberUtil } from '../../utils/tix.number-util';
import { StringUtil } from '../../utils/tix.string-util';

var globalConfigs = require("../../tix.global-config.json");
var data = require("../resources/tix." + globalConfigs.envName + "-config.json");

export class DashboardPage {

    private action: string = (globalConfigs.loginUserType == 'admin') ? '' : 'producer';

    constructor() {
        this.navigateTo();
    }

    navigateTo() {
        return browser.get(this.getDashboardUrl());
    }

    getDashboardUrl() {
        return data.appUrl + '/' + this.action;
    }

    /***************    C109    ***************/

    isProducerDashboardMenuExists() {
        return element(by.css("app-root app-menu aside a[href='/producer']")).isPresent();
    }

    isFileUploadMenuExists() {
        return element(by.css("app-root app-menu aside a[href='/producer/file-upload']")).isPresent();
    }

    isProfileMenuExits() {
        return element(by.css("app-root app-menu aside nav ul li:nth-child(3) md-icon")).isPresent();
    }

    getNumberOfCurrencyBoxes() {
        return element.all(by.css("app-root app-producer-dashboard app-currency-summary")).count();
    }

    hasTradeixLogo() {
        return element(by.css("app-root app-menu-bar img[src*='logo-light.svg']")).isPresent();
    }

    hasThreeOptionsInLeftMenu() {
        return this.isProducerDashboardMenuExists() && this.isFileUploadMenuExists() && this.isProfileMenuExits();
    }

    /***************    C110    ***************/

    getFundButtonByType(type) {
        return element(by.css("app-root md-sidenav-container app-producer-dashboard app-currency-summary md-card a[href='/producer/create-offer/choose-buyers/" + type + "']"));
    }

    checkIfFundButtonIsEnabledByType(type) {
        return this.getFundButtonByType(type).getAttribute("disabled").then((result) => {
            return result != "true";
        });
    }

    getCountOfEnabledFundButtons() {
        return element.all(by.css("app-root md-sidenav-container app-producer-dashboard app-currency-summary md-card a[href^='/producer/create-offer/choose-buyers/']")).filter((elm) => {
            return elm.getAttribute("disabled").then((result) => {
                return result != "true";
            })
        }).count();
    }

    clickOnActiveFundButton() {
        let fundButton: any;
        if (this.checkIfFundButtonIsEnabledByType("USD")) {
            fundButton = this.getFundButtonByType("USD");
        } else if (this.checkIfFundButtonIsEnabledByType("EUR")) {
            fundButton = this.getFundButtonByType("EUR");
        } else if (this.checkIfFundButtonIsEnabledByType("GBP")) {
            fundButton = this.getFundButtonByType("GBP");
        }

        return fundButton.isDisplayed().then((displayed) => {
            if (displayed) {
                return fundButton.click().then(() => {
                    return true;
                });
            } else {
                return false
            }
        });
    }

    getListOfAvailableItemsInList() {
        return element.all(by.css("*[for^='input-md-checkbox-']"));
    }

    uncheckAllBuyersInList() {
        return browser.actions().mouseMove(this.getListOfAvailableItemsInList().first()).click().perform();
    }

    checkFirstBuyerInList() {
        return browser.actions().mouseMove(this.getListOfAvailableItemsInList().get(1)).click().perform();
    }

    clickNextButtonFromAvailabaleBuyersList() {
        let elm = element(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers app-breadcrumb button.mat-raised-button"));
        return browser.actions().mouseMove(elm).click().perform();
    }

    clickNextButtonFromAvailabaleInvoicesList() {
        let elm = element(by.css("app-root md-sidenav-container app-choose-invoices app-breadcrumb button.mat-raised-button"));
        return browser.actions().mouseMove(elm).click().perform();
    }

    clickReturnToDashboardButtonFromPopup() {
        let elm = element(by.css("*[id^='cdk-overlay-'] md-dialog-container invoice-funders-dialog md-dialog-actions button.mat-button"));
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return true;
        });
    }

    keepBrowserWaiting() {
        return browser.sleep(1500);
    }

    chooseFirstAvailabaleBuyerAndClickNext() {
        try {
            return this.uncheckAllBuyersInList().then(() => {
                return this.keepBrowserWaiting().then(() => {
                    return this.checkFirstBuyerInList().then(() => {
                        return this.keepBrowserWaiting().then(() => {
                            return this.clickNextButtonFromAvailabaleBuyersList().then(() => {
                                return true;
                            });
                        });
                    });
                });
            });
        } catch (ex) {
            console.log(ex.status);
            return false;
        }
    }

    chooseFirstAvailableInvoiceAndClickNext() {
        try {
            return this.uncheckAllBuyersInList().then(() => {
                return this.keepBrowserWaiting().then(() => {
                    return this.checkFirstBuyerInList().then(() => {
                        return this.keepBrowserWaiting().then(() => {
                            return this.clickNextButtonFromAvailabaleInvoicesList().then(() => {
                                return true;
                            });
                        });
                    });
                });
            });
        } catch (ex) {
            console.log(ex.status);
            return false;
        }
    }

    /***************************    C111    ****************************/

    clickReviewPricingOrBidsButtonFromPopup() {
        let elm = element(by.css("*[id^='cdk-overlay-'] md-dialog-container invoice-funders-dialog md-dialog-actions button.mat-raised-button.mat-primary"));
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return true;
        });
    }

    clickAcceptButtonFromBidDetails() {
        let elm = element(by.css("app-root md-sidenav-container app-bid-summary section md-card button.mat-raised-button.mat-accent"));
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return true;
        });
    }

    clickOkButtonFromBidAcceptedPopup() {
        let elm = element(by.css("*[id^='cdk-overlay-'] md-dialog-container app-accept-dialog md-dialog-actions button.mat-button.mat-primary"));
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return true;
        });
    }


    /***************************    C112    ****************************/

    getViewOffersButtonByType(type) {
        return element(by.css("app-root md-sidenav-container app-producer-dashboard app-currency-summary md-card a[href='/producer/offer-list/" + type + "']"));
    }

    checkIfViewOffersButtonIsEnabledByType(type) {
        return this.getViewOffersButtonByType(type).getAttribute("disabled").then((result) => {
            return result != "true";
        });
    }

    getCountOfEnabledViewOffersButtons() {
        return element.all(by.css("app-root md-sidenav-container app-producer-dashboard app-currency-summary md-card a[href^='/producer/offer-list/']")).filter((elm) => {
            return elm.getAttribute("disabled").then((result) => {
                return result != "true";
            })
        }).count();
    }

    clickOnActiveViewOffersButton() {
        let fundButton: any;
        if (this.checkIfViewOffersButtonIsEnabledByType("USD")) {
            fundButton = this.getViewOffersButtonByType("USD");
        } else if (this.checkIfViewOffersButtonIsEnabledByType("EUR")) {
            fundButton = this.getViewOffersButtonByType("EUR");
        } else if (this.checkIfViewOffersButtonIsEnabledByType("GBP")) {
            fundButton = this.getViewOffersButtonByType("GBP");
        }

        return fundButton.isDisplayed().then((displayed) => {
            if (displayed) {
                return fundButton.click().then(() => {
                    return true;
                });
            } else {
                return false;
            }
        });
    }

    clickFirstViewBidsOrPricingSummaryButton() {
        let elm = element.all(by.css("app-root md-sidenav-container tix-offer-list data-grid table tbody a[href^='/producer/create-offer/bid-summary/']")).get(0);
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return true;
        });
    }

    clickCancelButtonOfViewBidsOrPricingSummary() {
        let elm = element(by.css("app-root md-sidenav-container app-bid-summary app-breadcrumb button.mat-raised-button.mat-primary"));
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return true;
        });
    }

    /***************************    C114    ****************************/

    getUiHeaderTextOfBuyersList() {
        return element(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers .padding-container .padding-top h1")).getText().then((innerText) => {
            return innerText;
        });
    }

    getTotalNumberOfAvailableBuyers() {
        return element.all(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table tbody tr")).count();
    }

    getTotalNumberOfSelectedBuyers() {
        return element.all(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table tbody tr md-checkbox.mat-checkbox-checked")).count();
    }

    getCountShowedForTotalAvailableBuyers() {
        return element(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers app-subtotal md-card .available summary")).getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getCountShowedForTotalSelectedBuyers() {
        return element(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers app-subtotal md-card .selected summary")).getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getValueShowedForTotalAvailableBuyers() {
        return element(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers app-subtotal md-card .available span")).getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getValueShowedForTotalSelectedBuyers() {
        return element(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers app-subtotal md-card .selected span")).getText().then((innerText) => {
            return NumberUtil.stringToNumber(innerText);
        });
    }

    getSumOfAllInvoiceValuesInList() {
        return NumberUtil.getSumFromArrayOfElements(element.all(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table tbody [ng-reflect-ng-switch='currency']")));
    }

    getSumOfSelectedInvoiceValuesInList() {
        return NumberUtil.getSumFromArrayOfElements(element.all(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table tbody tr.selected [ng-reflect-ng-switch='currency']")));
    }

    checkIfDataGridColumnsNamesAsPerExpectation() {
        let columns = ["Buyer Name", "Entity Id", "Num. Invoices", "Total Invoice Value"];
        return element.all(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers data-grid table thead th > div:nth-child(1):not(.mat-checkbox)")).map((elm) => {
            return elm.getText();
        }).then((texts) => {
            return StringUtil.checkIfTwoArraysContainSimilarElements(columns, texts as Array<string>);
        });
    }

    clickOnCancelButtonFromBuyersListView() {
        let elm = element(by.css("app-root md-sidenav-container app-producer-create-offer-choose-buyers app-breadcrumb button.mat-button"));
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return true;
        });
    }

}