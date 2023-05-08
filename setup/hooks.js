const playwright = require('playwright');
const { BeforeAll, Before, After, AfterAll , Status, setDefaultTimeout } = require('@cucumber/cucumber');
const cucumber = require('../cucumber');

// const { World } = require('@cucumber/cucumber')

// Launch options.
const options = {
  headless: true,
  slowmo: 1000
};
// const devTools = {
//   devtools: true
// };

setDefaultTimeout(60000);

// Create a global browser for the test session.
BeforeAll(async () => {
  console.log('before all ...');
  global.browser = await playwright['webkit'].launch(options);
});

AfterAll(async () => {
  console.log('after all ...');
  await global.browser.close();
});

// Create a fresh browser context for each test.
Before(async () => {
  console.log('before ...');
  global.context = await global.browser.newContext();
  global.page = await global.context.newPage();
});

//close the page and context after each test.
After(async () => {
  console.log('after pass...');
  await global.page.close();
  await global.context.close();
});


After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    var buffer = await global.page.screenshot({ path: `reports/${scenario.pickle.name}.png`, fullPage: true })
    this.attach(buffer, 'image/png');
  }
});