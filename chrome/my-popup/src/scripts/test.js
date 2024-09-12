const puppeteer = require('puppeteer');
const axios = require('axios');

function getConfigKey(url) {
  if (!puppeteer) {
    console.error('puppeteer is not available in the browser');
    return;
  }

  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url); // Replace with your target URL
    await page.setBypassCSP(true);

    // Run the function `Clerk._config.key` on the webpage and get the result
    const config = await page.evaluate(() => {
      // Make sure Clerk and its properties are available
      if (window.Clerk && window.Clerk._config && window.Clerk._config.key) {
        return window.Clerk._config;
      } else {
        return 'Clerk._config is not available.';
      }
    });

    axios({
      method: 'get',
      url: `https://api.clerk.io/v2/client/account/info?key=${config.key}`
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return 'API error:', error;
      });

    await browser.close();
  })();
}
module.exports = getConfigKey;