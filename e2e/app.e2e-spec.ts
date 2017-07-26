import { TradeixE2eAutomationPage } from './app.po';

describe('tradeix-e2e-automation App', () => {
  let page: TradeixE2eAutomationPage;

  beforeEach(() => {
    page = new TradeixE2eAutomationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
