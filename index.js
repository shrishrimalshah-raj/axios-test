const axios = require("axios");
const fetch = require("node-fetch");
var http = require("http");
const cheerio = require("cheerio");

const puppeteer = require("puppeteer");
let cookie = `_ga=GA1.2.1063069182.1612492620; _gid=GA1.2.876682371.1612492620; nsit=f-gMl6fm3jVXrUHgEnoFZnVJ; AKA_A2=A; ak_bmsc=133C0FBB1D5357B3ACEBF019F3B26467687C3634346F0000F08A1D60359E015B~pl881bE4AUKoS1H+xfo0CClmzpDvnSdwPluDfW+7tppcUj8Lm3wZnxAyomSkTIkZBdgiYk5WVsnL0AXEP2xJuBGaH/YpYB4bD4Yqo/+p3eYYKbRiEsLORqLRj0StVOAMY8Arj8GtlO9rE1G13VWMM+GF15pAg3ZaEt4j6vntvuJmc1jcTo6dis+86BAunNCrYwMOrAdJ/egsjRhjN90ln5Lc7D0HbDVzqDC+vjC+w3s5iZ2gkg2fx+VtstmfgkfURb; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTYxMjU1MDYwMiwiZXhwIjoxNjEyNTU0MjAyfQ.XB-Wr6Lt-2CqdPA2z3dI2TOZKc033ud4e5DEb2Dgtig; RT="z=1&dm=nseindia.com&si=7dcd2b73-7b82-4916-8793-2d7d4d44596c&ss=kksly5ut&sl=6&tt=bs3&bcn=%2F%2F684fc537.akstat.io%2F"; bm_sv=D88B5E78F7F0407BC83C11A785DC2A80~cGd5EJUxUX1L+t98TLJG2dwX2kThKT5bnG+lYN2pYoWj6MSKVprwdLy7mBvXq0ZYzUeShCbiAU8LUZmVt/kW4D+971jmh/L8EyrxQUwXYs7/i0q7PC0bI6qZ/38Yvgcz2waER4zdz5ltmRkTyS+d7BTR1RXFVpHtCwvQ9cDnEu8=`;
const getCookie = async () => {
  console.log("CRON JOB START");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const websiteUrl =
    "https://www.nseindia.com/market-data/pre-open-market-cm-and-emerge-market";

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

  const response = await axios.get(
    "https://www.nseindia.com/api/liveEquity-derivatives?index=nifty_bank_fut",
    headers
  );

  const head = response.headers;
  cookie = head["set-cookie"];

  console.log("FUTURE DATA *****", response.data);
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

  console.log("************ getAPI API Called ***************");

  const response = await axios.get(
    "https://www.nseindia.com/market-data/equity-derivatives-watch",
    headers
  );

  const head = response.headers;
  // cookie = head["set-cookie"];
  // cookie = `${cookie[1]}`;
  console.log("getAPI ****", cookie);
};

const FetchAPI = async () => {
  console.log("************ FetchAPI API Called ***************");

  fetch(
    "https://www1.nseindia.com/live_market/dynaContent/live_watch/fomktwtch_FUTIDXNIFTY.htm",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "if-modified-since": "Sun, 07 Feb 2021 08:00:04 GMT",
        "if-none-match": '"ff0-5baba70ed397b-gzip"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie:
          '_ga=GA1.2.2130074722.1603942450; sym1=CUB; sym2=INFY; pointer=2; underlying1=INFY; instrument1=FUTSTK; optiontype1=-; expiry1=26NOV2020; strikeprice1=-; _gid=GA1.2.1585027921.1612636690; NSE-TEST-1=1960845322.20480.0000; bm_mi=A821970D50E1DD734A94ECDC47B54EB7~T2Ltrv0JkNENyQifqgTfKLtPJokMES61xcaYH5Im5A0/9EqOsvzNAzPMRkJ3c3Pr3G9YlxWbc2lDKmVNGy3g2X5W/5Cc5aJ9AQ43IRB9UW5WPDQzYpoQ60N+RZMmLU7SKKG3gyGQkwawOripdwgKAT1Xgz1vqOJsg1LmLN6P8y769N5cMaxiLFcmyKWy4te2S2y06cc+6N0pthKXcQJHA56gsrxlxUnDOskgbqEIdXWl2GoGZNg/Z+aaAsP3HvVbMW+kxeOP8zqHiQHGracTEAXuAf7XMfp/wXYI9MaCS/Hi7JIt5umj/L8iCr/wjcqa74um3ucTp4qS2URZW8o8Hg==; ak_bmsc=69A01686EBD777A2ACFA956F379CDB6317D4FDA6BC7200004C991F6016163D35~plcYPM9rRVVO4bm4DPvxBGgB+Obeo6pEEY7IHLhJ4cwNOewy35qa/h/y8COgQJTUvPxiTSLsXkJ0hxi9B92GdF6q4u040O0QDNeQymaPIZ0gJnjXObN/FoRXWfF7q14cKNjq+bHw2qALe1RhRwon8cq5ncsRFnvIK8MiqDXqdC94ulHSBoCiO5F4VAp/GFkMU414uHRBPQOrsVzo2u+atBNu4+rphowjNWbVIZX9oz3iIb8jRogsm/Vrdki2bOsiDN; JSESSIONID=74DC8A7830769D583B863D0B5169A414.tomcat2; underlying2=BANKNIFTY; instrument2=FUTIDX; optiontype2=-; expiry2=25FEB2021; strikeprice2=-; pointerfo=2; bm_sv=055CC702A76F6D06C4B590CFF57EA023~OEoUuVtuu3axXl8FS2YKPpjB3/GTBUKNesp77Im8TIwBkXveVM8ZB6fNMWT0Fjg84puGzvvpqcAkt1AE94nv63z8I8kCijUBBu6tIG/M1L1lrL2BsrAg6d6xsbFA2l3x5BFzQQyEmMph/7wM5vm+Ph7lC/93g8jowrx4cP5yflk=; RT="z=1&dm=nseindia.com&si=869c7b93-fe7a-4b4c-b8a8-9e7322e16cee&ss=kkuu6aaq&sl=c&tt=az8&bcn=%2F%2F684d0d38.akstat.io%2F&ld=121n6"',
      },
      referrer:
        "https://www1.nseindia.com/live_market/dynaContent/live_watch/derivative_stock_watch.htm",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
    }
  )
    .then((res) => res.text())
    .then((body) => console.log(body));
};

const FetchCherioAPI = async () => {
  console.log("************ FetchAPI API Called ***************");

  const html = await axios.get(
    "https://www1.nseindia.com/live_market/dynaContent/live_watch/derivative_stock_watch.htm",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          '_ga=GA1.2.2130074722.1603942450; sym1=CUB; sym2=INFY; pointer=2; underlying1=INFY; instrument1=FUTSTK; optiontype1=-; expiry1=26NOV2020; strikeprice1=-; _gid=GA1.2.1585027921.1612636690; NSE-TEST-1=1960845322.20480.0000; bm_mi=A821970D50E1DD734A94ECDC47B54EB7~T2Ltrv0JkNENyQifqgTfKLtPJokMES61xcaYH5Im5A0/9EqOsvzNAzPMRkJ3c3Pr3G9YlxWbc2lDKmVNGy3g2X5W/5Cc5aJ9AQ43IRB9UW5WPDQzYpoQ60N+RZMmLU7SKKG3gyGQkwawOripdwgKAT1Xgz1vqOJsg1LmLN6P8y769N5cMaxiLFcmyKWy4te2S2y06cc+6N0pthKXcQJHA56gsrxlxUnDOskgbqEIdXWl2GoGZNg/Z+aaAsP3HvVbMW+kxeOP8zqHiQHGracTEAXuAf7XMfp/wXYI9MaCS/Hi7JIt5umj/L8iCr/wjcqa74um3ucTp4qS2URZW8o8Hg==; ak_bmsc=69A01686EBD777A2ACFA956F379CDB6317D4FDA6BC7200004C991F6016163D35~plcYPM9rRVVO4bm4DPvxBGgB+Obeo6pEEY7IHLhJ4cwNOewy35qa/h/y8COgQJTUvPxiTSLsXkJ0hxi9B92GdF6q4u040O0QDNeQymaPIZ0gJnjXObN/FoRXWfF7q14cKNjq+bHw2qALe1RhRwon8cq5ncsRFnvIK8MiqDXqdC94ulHSBoCiO5F4VAp/GFkMU414uHRBPQOrsVzo2u+atBNu4+rphowjNWbVIZX9oz3iIb8jRogsm/Vrdki2bOsiDN; JSESSIONID=74DC8A7830769D583B863D0B5169A414.tomcat2; underlying2=BANKNIFTY; instrument2=FUTIDX; optiontype2=-; expiry2=25FEB2021; strikeprice2=-; pointerfo=2; bm_sv=055CC702A76F6D06C4B590CFF57EA023~OEoUuVtuu3axXl8FS2YKPpjB3/GTBUKNesp77Im8TIwBkXveVM8ZB6fNMWT0Fjg84puGzvvpqcAkt1AE94nv63z8I8kCijUBBu6tIG/M1L2SxqtkwM0RyBlaP3llToW7UtH2sp98rmMSteqKzaWhaQSVV38LvBLA++FGgmBvLV8=; RT="z=1&dm=nseindia.com&si=869c7b93-fe7a-4b4c-b8a8-9e7322e16cee&ss=kkuu6aaq&sl=d&tt=brx&bcn=%2F%2F684d0d38.akstat.io%2F&ld=1cdrl"',
      },
      mode: "cors",
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64)",
      "content-encoding": "gzip",
      "content-type": "application/json",
    }
  );
  const $ = await cheerio.load(html.data);
  console.log("***************************", $.html());
};

const FetchMCAPI = async () => {
  console.log("************ FetchMCAPI API Called ***************");

  const html = await axios.get(
    "https://www.moneycontrol.com/indices/fno/view-option-chain/BANKNIFTY/2021-02-11"
  );
  const $ = await cheerio.load(html.data);
  console.log("***************************", $.html());
};

(async () => {
  // await getCookie();
  // await getAPI();
  // await getFutureData();
  // await getAPI();
  // await FetchAPI();
  // await FetchCherioAPI();
  await FetchMCAPI
})();
