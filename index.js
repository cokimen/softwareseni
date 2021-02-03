const express = require('express')
const server = express()
const middleware = require("https");
const _ = require('lodash')

const keyApi = "0oaTF6zE2p4GTDrPw99o7n0J9sPWtEgr";


// supose to be in .env file
const hostMiddlewareConfig = {
  host: "api.nytimes.com",
  port: 443,
  method: "GET",
};

// function to setApi and get parameter to search
let putApiToOption = (apiKey, searchKeyWord, middlewareEndPoint, method) => {
   let options = {
     hostname: hostMiddlewareConfig.host,
     port: hostMiddlewareConfig.port,
     path: `${middlewareEndPoint}` + `${searchKeyWord}+&api-key=${keyApi}`,
     method: method,
   };
  // console.log(options.path)
  return options

}




// api url to search articles
https: server.get(
  "/search_article/:searchContent/:isSort",
  (req, res, next) => {
    let reqToMiddleware = middleware.get(
      putApiToOption(
        keyApi,
        `q=${req.params.searchContent}`,
        `/svc/search/v2/articlesearch.json?`, 'GET'
      ),
      (resMiddleWare) => {
        console.log(`statusCode: ${resMiddleWare.statusCode}`);
        let data = "";
        resMiddleWare.on("data", (chunk) => {
          data += chunk;
          console.log(chunk instanceof Buffer);
        });

        resMiddleWare.on("close", () => {
          // get the part data only
          let result = JSON.parse(data).response;

          // for sorting if paramisSort isSort fill by "ascending"
          result =
            req.params.isSort === "ascending"
              ? _.sortBy(result.docs, function (item) {
                  return item.pub_date;
                })
              : result;

          res.json({ articles: result });
        });
      }
    );
  }
);


// api for get books
https: server.get(
  "/search_books/:searchContent/:isSort",
  (req, res, next) => {
    let reqToMiddleware = middleware.get(
      putApiToOption(
        keyApi,
        ``,
        `/svc/books/v3/lists/current/hardcover-fiction.json?`, 'GET'
      ),
      (resMiddleWare) => {
        console.log(`statusCode: ${resMiddleWare.statusCode}`);
        let data = "";
        resMiddleWare.on("data", (chunk) => {
          data += chunk;
          console.log(chunk instanceof Buffer);
        });

        resMiddleWare.on("close", () => {
          // get the part data only
          let result = JSON.parse(data).results;
          res.json({ books: result.books });
        });
      }
    );
  }
);






server.listen(3000, function () {
    console.log('server is started')
})