import { browser, by, element, protractor, $, $$ } from 'protractor';

export class LogOutPage {
    logout() {
        let elm = $$('app-root app-menu nav li md-icon:not([ng-reflect-message])').last();
        return browser.actions().mouseMove(elm).click().perform().then(() => {
            return browser.sleep(1000).then(() => {
                let elm = $('app-root md-sidenav-container md-sidenav.menu.mat-sidenav-opened profile-menu profile-menu-item a');
                return browser.actions().mouseMove(elm).click().perform().then(() => {
                    return $("form.login-form").isPresent().then(result => {
                        return result;
                    });
                });
            });
        });
    }
}