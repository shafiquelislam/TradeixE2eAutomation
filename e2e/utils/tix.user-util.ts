import { browser } from 'protractor';

export class UserUtil {

    /**
     * Returns true if the currently loggin user is Authorized and false otherwise
     * 
     * @returns 
     * @memberof UserUtil
     */
    static isAuthorized() {
        return browser.executeScript("return window.sessionStorage.getItem('IsAuthorized');").then((result) => {
            return result === 'true';
        });
    }

}
