const promise = require('selenium-webdriver');
let expect = require('chai').expect;
let webdriver = require('selenium-webdriver');

/* promise manager for selenium-webdriver is going to be deprecated */
/* you must use async/await as an alternative */
promise.USE_PROMISE_MANAGER = false;

let username = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY,
    appURL = "https://www.saucedemo.com",
    tags = ["sauceDemo", "async", "node", "webdriverjs", "headless" ],
    driver;

describe ('headlessfirefoxtest', function() {
    this.timeout(50000);
    beforeEach(async function () {
        driver = await new webdriver.Builder().withCapabilities({
            'browserName': 'firefox',
            // 'platformName': 'linux',
            'browserVersion': 'latest',
            'sauce:options': {
                'username': username,
                'accessKey': accessKey,
                'build': 'new',
                'name': 'headlessfirefox',
                'maxDuration': 3600,
                'idleTimeout': 1000,
                'tags': tags
            }
        }).usingServer("https://ondemand.us-east-1.saucelabs.com/wd/hub")
            .build();
        await driver.getSession().then(function (sessionid) {
            driver.sessionID = sessionid.id_;
        });
    });


    it('get-title-test', async function() {
        await driver.get(appURL);
        const title = await driver.getTitle();
        console.log('Page Title is: ' + title);
        console.log(`SauceOnDemandSessionID=${driver.sessionID} job-name=headlessfirefox`)
        expect(title).equals('Swag Labs');
        driver.quit();
    });
});
