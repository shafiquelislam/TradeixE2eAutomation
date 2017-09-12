import { browser } from 'protractor';
import { LogOutPage } from '../main/tix.logout-page';

describe('C120 Logout validation', () => {

    let logOutPage: LogOutPage = new LogOutPage();

    afterAll(() => {
        browser.sleep(2000);
    });

    afterEach(() => {
        browser.sleep(2000);
    });

    it('should click on "Profile" icon', done => {
        expect(logOutPage.clickOnProfileIcon()).toBe(true);
        done();
    });

    it('should perform logout action by clicking "Logoff" link', done => {
        expect(logOutPage.logout()).toBe(true);
        done();
    });
});
