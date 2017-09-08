import { browser, by, element, $, $$, ExpectedConditions, protractor } from 'protractor';

export class ElementUtil {

    static waitForPageLoad(target, elm) {
        return target.click().then(() => {
            var EC = protractor.ExpectedConditions;
            return browser.wait(EC.presenceOf(elm), 15000).then(() => {
                return elm.isPresent().then((resp) => {
                     return resp;
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

};