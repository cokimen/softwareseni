const express = require('express')
const server = express()
const middleware = require("https");
// const { Stream } = require('stream');

const keyApi = "0oaTF6zE2p4GTDrPw99o7n0J9sPWtEgr";


// function to setApi and get parameter to search
let putApiToOption = (apiKey, searchKeyWord) => {
   let options = {
     hostname: "api.nytimes.com",
     port: 443,
     path: `/svc/search/v2/articlesearch.json?q=${searchKeyWord}&api-key=${keyApi}`,
     method: "GET",
   };
  console.log(options.path)
  return options

}




server.get("/search_article/:searchContent/:isSort", (req, res, next) => {

  let reqToMiddleware = middleware.get(
    putApiToOption(keyApi, req.params.searchContent),
    (resMiddleWare) => {
      console.log(`statusCode: ${resMiddleWare.statusCode}`);
      let data = "";
      resMiddleWare.on("data", (chunk) => {
        data += chunk;
        console.log(chunk instanceof Buffer);
      });

      resMiddleWare.on("close", () => {
        console.log(typeof data);
        // console.log(data)

        // let result = Object.keys(JSON.parse(data))
        let result = JSON.parse(data).response;
        // console.log(data.response)
        res.json({ articles: result.docs });
      });
    }
  );

   
});

server.listen(3000, function () {
    console.log('server is started')
})