import { browser, by, element, $, $$, ExpectedConditions, protractor } from 'protractor';

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

    static checkIfElementLoaded(elementLocator: string, timeout = 15000) {
        var until = protractor.ExpectedConditions;
        return browser.wait(until.presenceOf($(elementLocator)), timeout, 'Element taking too long to appear in the DOM').then(() => {
            return true;
        }, () => {
            return false;
        });
    }

    static clickAndWaitForElement(clickOn: string, waitFor: string, timeout = 15000) {
        return browser.actions().mouseMove($(clickOn)).perform().then(() => {
            return this.checkIfElementLoaded(waitFor, timeout);
        });
    }

};