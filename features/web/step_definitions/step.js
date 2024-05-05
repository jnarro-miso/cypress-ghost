const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

When('I enter username {kraken-string}', async function (email) {
  let element = await this.driver.$('#identification');
  return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
  let element = await this.driver.$('#password');
  return await element.setValue(password);
});

When('I click Sign in', async function () {
  let element = await this.driver.$("[data-test-button='sign-in']");
  return await element.click();
});

Then('I see the dashboard', async function () {
  this.driver.getUrl().then((url) => {
    console.log('URL:', url);
    assert.strictEqual(url, 'http://localhost:2368/ghost/#/dashboard');
  })
});