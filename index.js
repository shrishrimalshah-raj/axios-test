const axios = require("axios");
const fetch = require("node-fetch");
var http = require("http");

const puppeteer = require("puppeteer");
let cookie = `_ga=GA1.2.1063069182.1612492620; _gid=GA1.2.876682371.1612492620; nsit=f-gMl6fm3jVXrUHgEnoFZnVJ; AKA_A2=A; ak_bmsc=133C0FBB1D5357B3ACEBF019F3B26467687C3634346F0000F08A1D60359E015B~pl881bE4AUKoS1H+xfo0CClmzpDvnSdwPluDfW+7tppcUj8Lm3wZnxAyomSkTIkZBdgiYk5WVsnL0AXEP2xJuBGaH/YpYB4bD4Yqo/+p3eYYKbRiEsLORqLRj0StVOAMY8Arj8GtlO9rE1G13VWMM+GF15pAg3ZaEt4j6vntvuJmc1jcTo6dis+86BAunNCrYwMOrAdJ/egsjRhjN90ln5Lc7D0HbDVzqDC+vjC+w3s5iZ2gkg2fx+VtstmfgkfURb; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTYxMjU1MDYwMiwiZXhwIjoxNjEyNTU0MjAyfQ.XB-Wr6Lt-2CqdPA2z3dI2TOZKc033ud4e5DEb2Dgtig; RT="z=1&dm=nseindia.com&si=7dcd2b73-7b82-4916-8793-2d7d4d44596c&ss=kksly5ut&sl=6&tt=bs3&bcn=%2F%2F684fc537.akstat.io%2F"; bm_sv=D88B5E78F7F0407BC83C11A785DC2A80~cGd5EJUxUX1L+t98TLJG2dwX2kThKT5bnG+lYN2pYoWj6MSKVprwdLy7mBvXq0ZYzUeShCbiAU8LUZmVt/kW4D+971jmh/L8EyrxQUwXYs7/i0q7PC0bI6qZ/38Yvgcz2waER4zdz5ltmRkTyS+d7BTR1RXFVpHtCwvQ9cDnEu8=`;
const getCookie = async () => {
  console.log("CRON JOB START");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const websiteUrl =
    "https://www.nseindia.com/get-quotes/derivatives?symbol=NIFTY&identifier=FUTIDXNIFTY25-02-2021XX0.00";

  const response = await page.goto(websiteUrl, {
    // waitUntil: "networkidle2",
  });

  console.log(response);

  const headers = response.headers();
  console.log(headers);
  let tempCookie = headers["set-cookie"];
  const spltArray = tempCookie.split(";");
  const newCookie = `${spltArray[0]};${spltArray[4]};`;
  cookie = newCookie.replace(/ SameSite=Lax\n/g, "");
  console.log(cookie);
  console.log("CRON JOB END");

  await browser.close();
};

const getFutureData = async () => {
  const headers = {
    headers: {
      accept: "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie: cookie,
      mode: "cors",
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64)",
      "content-encoding": "gzip",
      "content-type": "application/json",
    },
  };

  console.log("************ getBankNiftyFutureData API Called ***************");

  const { data } = await axios.get(
    "https://www.nseindia.com/api/liveEquity-derivatives?index=nifty_bank_fut",
    headers
  );

  console.log(data);
};

const getAPI = async () => {
  const headers = {
    headers: {
      accept: "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie: cookie,
      mode: "cors",
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64)",
      "content-encoding": "gzip",
      "content-type": "application/json",
    },
  };

  console.log("************ getBankNiftyFutureData API Called ***************");

  const response = await axios.get(
    "https://www.nseindia.com/market-data/equity-derivatives-watch",
    headers
  );

  const head = response.headers;
  cookie = head["set-cookie"];
  // cookie = `${cookie[0]};${cookie[1]};`;
  console.log(cookie);
};

(async () => {
  // await getCookie();
  await getAPI();
  await getFutureData();
})();
