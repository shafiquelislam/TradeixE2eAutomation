import { browser } from 'protractor';
import { EntityTypePage } from '../main/tix.entity-type-page';

var globalConfig = require("../../tix.global-config.json");


describe('C137-C140 Admin panel Entity Type validation', () => {

    var defaultSpecDelayTime = globalConfig.defaultSpecDelayTime;

    afterEach(() => {
        browser.sleep(defaultSpecDelayTime);
    });

    let entityTypePage = new EntityTypePage();

    describe('C137 - UI validation', () => {

        it('should load Entity Type Page on clicking Entity Type Icon', (done) => {
            expect(entityTypePage.clickEntityTypeIconAndcheckForPageLoad()).toBe(true);
            done();
        });

        it('should display "Entity Types" as header text', (done) => {
            expect(entityTypePage.getEntityTypePageHeaderText()).toEqual('Entity Types');
            done();
        });

        it('should display "Entity Type" table column names', (done) => {
            expect(entityTypePage.checkEntityTypePageTableColumnNames()).toBe(true);
            done();
        });

        it('should display "Add" button on top-right corner', (done) => {
            expect(entityTypePage.checkIfAddButtonExists()).toBe(true);
            done();
        });

    });


    describe('C138 - Add functionality validation', () => {

        it('should create Entity Type', (done) => {
            expect(entityTypePage.createEntityType()).toBe(true);
            done();
        });

        it('should add the newly created Entity Type in Entity Type list', (done) => {
            expect(entityTypePage.checkIfCreatedEntityTypeAddedInEntityTypeList()).toBe(true);
            done();
        });

    });

    describe('C139 - Edit functionality validation', () => {

        it('should edit a Entity Type', (done) => {
            expect(entityTypePage.updateFirstENtityType()).toBe(true);
            done();
        });

        it('should add the updated Entity Type in company list', (done) => {
            expect(entityTypePage.checkIfEntityTypeUpdatedInEntityTypeList()).toBe(true);
            done();
        });

    });

});