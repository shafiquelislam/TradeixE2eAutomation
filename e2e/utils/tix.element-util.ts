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

    /**
     * 
     * @param element The ElementFinder for which browser will wait for its presence 
     * @param timeout Maximum timeout to be wait for the presence of the @param element
     * @return A Promise of boolean type indicating if the @param element is found or not
     */
    static checkIfElementLoadedByFinder(element: ElementFinder, timeout = 15000) {
        var until = protractor.ExpectedConditions;
        return browser.wait(until.presenceOf(element), timeout).then(() => {
            return true;
        }, () => {
            console.log("Element is either not found or taking too long to appear in the DOM");
            return false;
        });
    }

    /**
     * 
     * @param clickOnCssPath The CSS path of ElementFinder on which click action will be performed 
     * @param waitForCssPath The CSS path of ElementFinder for which browser will wait for its presence
     * @param timeout Maximum timeout to be wait for the presence of the ElementFinder at CSS path @param waitForCssPath
     * @return A Promise of boolean type indicating if the @param element is found or not
     */
    static clickAndWaitForElement(clickOnCssPath: string, waitForCssPath: string, timeout = 15000) {
        return browser.actions().mouseMove($(clickOnCssPath)).perform().then(() => {
            return this.checkIfElementLoadedByFinder($(waitForCssPath), timeout);
        });
    }

    /**
     * 
     * @param clickOnElement The ElementFinder on which click action will be performed 
     * @param waitForElement The ElementFinder for which browser will wait for its presence
     * @param timeout Maximum timeout to be wait for the presence of the @param waitForElement
     * @return A Promise of boolean type indicating if the @param waitForElement is found or not
     */    
    static clickAndWaitForElementByFinder(clickOnElement: ElementFinder, waitForElement: ElementFinder, timeout = 15000) {
        return browser.actions().mouseMove(clickOnElement).perform().then(() => {
            return this.checkIfElementLoadedByFinder(waitForElement, timeout);
        });
    }

};