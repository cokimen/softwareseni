const https = require("https");
const options = {
  hostname: "api.nytimes.com",
  port: 443,
  path: `/svc/search/v2/articlesearch.json?q=election&api-key=0oaTF6zE2p4GTDrPw99o7n0J9sPWtEgr`,
  method: "GET",
};
const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();
