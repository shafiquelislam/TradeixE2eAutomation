import { browser, by, element, $, $$, protractor, ExpectedConditions, ElementFinder } from 'protractor';

export class ElementUtil {

    static clickAndWaitForPageLoad(button, targetElm) {
        return button.click().then(() => {
            var EC = protractor.ExpectedConditions;
            return browser.wait(EC.presenceOf(targetElm), 15000).then(() => {
                return targetElm.isPresent().then((result) => {
                    return result;
                }).catch(ex => {
                    console.log("Element is not present");
                    return false;
                });
            }).catch(ex => {
                console.log("Page takes too long time to load");
                return false;
            });
        });
    }

    static checkIfElementLoadedByFinder(element: ElementFinder, timeout = 15000) {
        var until = protractor.ExpectedConditions;
        return browser.wait(until.presenceOf(element), timeout).then(() => {
            return true;
        }, () => {
            console.log("Element is either not found or taking too long to appear in the DOM");
            return false;
        });
    }

    static clickAndWaitForElement(clickOnCss: string, waitForCss: string, timeout = 15000) {
        return browser.actions().mouseMove($(clickOnCss)).perform().then(() => {
            return this.checkIfElementLoadedByFinder($(waitForCss), timeout);
        });
    }

    static clickAndWaitForElementByFinder(clickOnElement: ElementFinder, waitForElement: ElementFinder, timeout = 15000) {
        return browser.actions().mouseMove(clickOnElement).perform().then(() => {
            return this.checkIfElementLoadedByFinder(waitForElement, timeout);
        });
    }

};