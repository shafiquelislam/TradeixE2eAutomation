import { browser } from 'protractor';
import { LogOutPage } from '../main/tix.logout-page';

describe('C108 Login validation', () => {

    let logOutPage: LogOutPage = new LogOutPage();

    afterAll(() => {
        browser.sleep(2000);
    });

    it('should perform logout action', done => {
      expect(logOutPage.logout()).toBe(true);
      done();
    });
});