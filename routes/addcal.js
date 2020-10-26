var express = require("express");
var router = express.Router();
const dbconnect = require("./dbconnect.json");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: dbconnect.host,
  port: dbconnect.port,
  user: dbconnect.user,
  password: dbconnect.password,
  database: dbconnect.database,
});
connection.connect();
// addcalendar.js
router.post("/", function (req, res) {
  console.log("실행됨-------------------");
  connection.query(
    "insert into todo (title,start,end,backgroundcolor) values('" +
      req.body.title +
      "','" +
      req.body.date +
      "','" +
      req.body.end +
      "','" +
      req.body.color +
      "')"
  );
  res.send(true);
});
module.exports = router;
