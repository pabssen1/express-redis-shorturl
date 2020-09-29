const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");
const nanoid = require("nanoid");

const redisPassword = "NJlcDM0uwHgppJAQgBZIGjDG9WEJIAI2";
const dbURL =
  "redis://redis-10679.c212.ap-south-1-1.ec2.cloud.redislabs.com:10679";

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

app.post("/shorten", function (req, res, next) {
  let id = nanoid.nanoid(6);
  let main_url = req.body.main_url;

  client.hmset(id, ["main_url", main_url], function (err, reply) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        shortId: id
      });
    }
    console.log(reply);
    console.log(id);
  });
});

app.listen(port);
