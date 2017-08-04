// Protractor configuration file, see link for more information https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var globalConfigs = require('./e2e/tix.global-config.json');

var htmlScreenshotReporter = new HtmlScreenshotReporter({
  reportTitle: "Tradeix e2e Automation Report",
  dest: 'src/target/screenshots',
  filename: 'tradeix-e2e-report.html',
  captureOnlyFailedSpecs: true,
  reportOnlyFailedSpecs: false
});

var specReporter = new SpecReporter({ 
  spec: { 
    displayStacktrace: true 
  } 
});

var showHtmlReport = globalConfigs.showHtmlReport;

exports.config = {
  allScriptsTimeout: 60000,
  specs: globalConfigs.specsList[globalConfigs.loginUserType],
  capabilities: {
    'browserName': globalConfigs.browserName
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  onPrepare() {
    browser.driver.manage().window().maximize();
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(specReporter);
    if(showHtmlReport) {
      jasmine.getEnv().addReporter(htmlScreenshotReporter);
    }
  },
  beforeLaunch: () => {
    return new Promise((resolve) => {
      if(showHtmlReport) {
        htmlScreenshotReporter.beforeLaunch(resolve);
      }
    });
  },
  afterLaunch: (exitCode) => {
    return new Promise((resolve) => {
      if(showHtmlReport) {
        htmlScreenshotReporter.afterLaunch(resolve.bind(this, exitCode));
      }
    });
  }
};
