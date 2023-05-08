const {expect} = require("@playwright/test");
//import { test, expect } from '@playwright/test';
require('dotenv').config();

locators = {
  "username_input": "#user-name",
  "password_input": "#password",
  "login_button": "#login-button",
  "inventory_container": "#inventory_container",
  "Apple_url":"https://www.apple.com/?afid=p238%7CseIEs444j-dc_mtid_1870765e38482_pcrid_630738884103_pgrid_13945964887_pntwk_g_pchan__pexid__&cid=aos-us-kwgo-brand-apple--slid---product-"

}

class HomePage{
async embassyHomePage() {
  await page.goto('https://portal.ustraveldocs.com/');
  const url = await page.url();
  console.log(`Navigated to ${url}`);
}
  async embassyLogin() {
    const emailLocator = '[class="stylizedInput1"]';
    const passLocator = '[id="loginPage:SiteTemplate:siteLogin:loginComponent:loginForm:password"]';
    const privacyPolicy = '[name="loginPage:SiteTemplate:siteLogin:loginComponent:loginForm:j_id167"]'
    const loginButton = '[id="loginPage:SiteTemplate:siteLogin:loginComponent:loginForm:loginButton"]'
    await page.waitForSelector(emailLocator);
    await page.waitForSelector(passLocator);
    await page.locator(emailLocator).click();
    await page.locator(emailLocator).fill(process.env.EMBASSY_EMAIL);
    await page.waitForTimeout(1000);
    await page.locator(passLocator).click();
    await page.locator(passLocator).fill(process.env.EMBASSY_PASS);
    await page.waitForTimeout(1000);
    await page.locator(privacyPolicy).click();
    await page.waitForTimeout(1000);
    await page.locator(loginButton).click();
    const captchBox = '[class="hcaptcha-box"]';
    const captchaElement = await page.$(captchBox);
    if (captchaElement && await captchaElement.isVisible()) {
      throw new Error('Captcha is visible');
    }
  }

  async firstMonth() {
    const firstMonthSelector = '[class="ui-datepicker-group ui-datepicker-group-first"] [class="ui-datepicker-month"]';
    const dateSelector = '[class="ui-datepicker-group ui-datepicker-group-first"] td>a';
  
    // Get the inner text of the first month
    const firstMonth = await page.$eval(firstMonthSelector, el => el.innerText);
    console.log(`First Month: ${firstMonth}`);
  
    // Get all date elements
    const allDates = await page.$$(dateSelector);
  
    // Iterate through the dates, get the inner text, and console log it
    let result = `First Month: ${firstMonth}\n`;
    for (const date of allDates) {
      const dateText = await date.evaluate(el => el.innerText);
      console.log(`Date: ${firstMonth} ${dateText}`);
      result += `Date: ${firstMonth} ${dateText}\n`;
    }
    return result;
  }
  async middleMonth() {
    const firstMonthSelector = '[class="ui-datepicker-group ui-datepicker-group-middle"] [class="ui-datepicker-month"]';
    const dateSelector = '[class="ui-datepicker-group ui-datepicker-group-middle"] td>a';
  
    // Get the inner text of the first month
    const firstMonth = await page.$eval(firstMonthSelector, el => el.innerText);
    console.log(`First Month: ${firstMonth}`);
  
    // Get all date elements
    const allDates = await page.$$(dateSelector);
  
    // Iterate through the dates, get the inner text, and console log it
    let result = `Middle Month: ${firstMonth}\n`;
    for (const date of allDates) {
      const dateText = await date.evaluate(el => el.innerText);
      console.log(`Date: ${firstMonth} ${dateText}`);
      result += `Date: ${firstMonth} ${dateText}\n`;
    }
    return result;
  }
  async lastMonth() {
    const firstMonthSelector = '[class="ui-datepicker-group ui-datepicker-group-last"] [class="ui-datepicker-month"]';
    const dateSelector = '[class="ui-datepicker-group ui-datepicker-group-last"] td>a';
  
    // Get the inner text of the first month
    const firstMonth = await page.$eval(firstMonthSelector, el => el.innerText);
    console.log(`First Month: ${firstMonth}`);
  
    // Get all date elements
    const allDates = await page.$$(dateSelector);
  
    // Iterate through the dates, get the inner text, and console log it
    let result = `Last Month: ${firstMonth}\n`;
    for (const date of allDates) {
      const dateText = await date.evaluate(el => el.innerText);
      console.log(`Date: ${firstMonth} ${dateText}`);
      result += `Date: ${firstMonth} ${dateText}\n`;
    }
    return result;
  }

}
module.exports = { HomePage };
