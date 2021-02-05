const axios = require("axios");
const fetch = require("node-fetch");
var http = require("http");

const puppeteer = require("puppeteer");
let cookie = "";
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
      cookie: `_ga=GA1.2.1063069182.1612492620; _gid=GA1.2.876682371.1612492620; nsit=f-gMl6fm3jVXrUHgEnoFZnVJ; AKA_A2=A; ak_bmsc=133C0FBB1D5357B3ACEBF019F3B26467687C3634346F0000F08A1D60359E015B~pl881bE4AUKoS1H+xfo0CClmzpDvnSdwPluDfW+7tppcUj8Lm3wZnxAyomSkTIkZBdgiYk5WVsnL0AXEP2xJuBGaH/YpYB4bD4Yqo/+p3eYYKbRiEsLORqLRj0StVOAMY8Arj8GtlO9rE1G13VWMM+GF15pAg3ZaEt4j6vntvuJmc1jcTo6dis+86BAunNCrYwMOrAdJ/egsjRhjN90ln5Lc7D0HbDVzqDC+vjC+w3s5iZ2gkg2fx+VtstmfgkfURb; _gat_UA-143761337-1=1; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTYxMjU0OTg2MCwiZXhwIjoxNjEyNTUzNDYwfQ.7aWgkU6x0RPlACKxhNSvMuCxaN5MPWoN0WKqV7sKA7U; RT="z=1&dm=nseindia.com&si=7dcd2b73-7b82-4916-8793-2d7d4d44596c&ss=kksly5ut&sl=5&tt=aqe&bcn=%2F%2F684fc537.akstat.io%2F"; bm_sv=D88B5E78F7F0407BC83C11A785DC2A80~cGd5EJUxUX1L+t98TLJG2dwX2kThKT5bnG+lYN2pYoWj6MSKVprwdLy7mBvXq0ZYzUeShCbiAU8LUZmVt/kW4D+971jmh/L8EyrxQUwXYs5LXy/ETRKAIHldxdbSWw9/1H72KtobQ20yU/miYRGRzrg2v24qCMT9vDD5Wgzv8Dw=`,
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
      cookie: `nsit=62b6eQKcFk9bUqykCYabIuvq; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTYxMjQ5MjYxOSwiZXhwIjoxNjEyNDk2MjE5fQ.QEcJocMzIbXQxnhpmx0VzHr3_dp8_ognruUVfQ3EmpU; _ga=GA1.2.1063069182.1612492620; _gid=GA1.2.876682371.1612492620; _gat_UA-143761337-1=1; ak_bmsc=16C3F1C2934DC4FD919727ED9F98BFC1687C3654744700004BAF1C602AA6C214~plPHct/6fABaSLOCGBgf54+Mg7VML7UYAWHS3jA0aJ0MK9yjLvcIlwC7KWLTCsEyoCyT9pb8/8KKlLSZWkWrK4rSpWnZi30SUfI/cRnIFwAHsQ+MEwhu1NLiCO6Dbe/Zl/wZ0/wODUrYdL7XKRr0OwWv61yOn4oQx8bdUyv5B26BmLvz9nL+sGhR/PqORKKJnkmuBEXgIEbjwkRQJyG3OeR91zw8+03OY7MJBV6XgZz6ayjy0mWmuWovik3ggGMeXl; RT="z=1&dm=nseindia.com&si=7dcd2b73-7b82-4916-8793-2d7d4d44596c&ss=kkrogzfc&sl=1&tt=4zl&bcn=%2F%2F684fc538.akstat.io%2F&ld=4zz&nu=b5bab066f515f60e72d7925c57abf2df&cl=527"; bm_sv=B82888A07DC5BCF4DE465BB3CC6D64DA~VW856xbPA/P/TlfAr8/Ae9AwswuGM/OfCf1hUOK+Lf2efEwg5Z0g5RsaKz4pqQ7ZCrgpwCEppQ3aUcsho2ZeCnRfwLqqVq1Qz1biZHlJoaaK7ad0TPVhzS3Gna0GZA2QRg++GXKU6KsegPc9b0dmYxQURUoFKurH63NIpk5x+Q0=`,
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
