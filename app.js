const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");
const nanoid = require("nanoid");
var cors = require("cors");

//Redis Client
let client = redis.createClient(process.env.REDIS_URL);

client.on("connect", function () {
  console.log("Connected to Redis...");
});

const port = process.env.PORT || 3000;
const app = express();
console.log(port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cors());
// Get redirect url
app.get("/:id", function (req, res, next) {
  console.log(req.params.id);
  client.hgetall(req.params.id, function (err, obj) {
    if (!obj) {
      res.send({
        error: "URL does not exist"
      });
    } else {
      obj.id = req.params.id;
      console.log(obj);
      let url = obj.main_url;
      let urlString = url.toString();
      res.send({ redirectUrl: urlString });
    }
  });
});

app.post("/url/add", function (req, res, next) {
  let id = nanoid.nanoid(6);
  let main_url = req.body.main_url;
  main_url = addhttp(main_url);
  client.hmset(id, ["main_url", main_url], function (err, reply) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        shortId: id,
        redirectUrl: main_url
      });
    }
    console.log(reply);
    console.log(id);
  });
});

app.post("/url/update", function (req, res, next) {
  let id = req.body.id;
  let main_url = req.body.main_url;
  main_url = addhttp(main_url);
  client.hmset(id, ["main_url", main_url], function (err, reply) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        shortId: id,
        redirectUrl: main_url
      });
    }
    console.log(reply);
    console.log(id);
  });
});

app.listen(port);
function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}
