const { webkit, devices, chromium, firefox } = require("playwright");
const util = require("util");
const iPhone11 = devices["iPhone 11 Pro"];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...iPhone11,
    locale: "en-US",
    geolocation: { longitude: 73.856743, latitude: 18.52043 },
    permissions: ["geolocation"],
  });
  const page = await context.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
  });
  // page.on("response", (response) =>
  //   console.log("<<", response.status(), response.headers())
  // );
  await page.goto(
    "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
  );

  const nifty = await page.innerText("body");
  const niftyJSON = JSON.parse(nifty);
  console.log("type of niftyJSON", typeof niftyJSON);

  await page.goto(
    "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY"
  );

  const niftyBank = await page.innerText("body");
  const niftyBankJSON = JSON.parse(niftyBank);
  console.log("type of niftyBankJSON", typeof niftyBankJSON);

  await browser.close();
})();
