const { urlencoded } = require("body-parser");
var express = require("express");
var router = express.Router();
const dbconnect = require("./dbconnect.json");
var mysql = require("mysql");
const cors = require("cors");
const { query } = require("express");
var connection = mysql.createConnection({
  host: dbconnect.host,
  port: dbconnect.port,
  user: dbconnect.user,
  password: dbconnect.password,
  database: dbconnect.database,
  dateStrings: "date",
});
connection.connect();

var outdata = [];

router.post("/", function (req, res) {
  const ss = connection.query(
    "SELECT * FROM BOARD where public = '" + req.body.userdiv + "' limit 10;",
    function (err, rows) {
      try {
        if (err) throw err;
        var i;
        outdata = [];
        for (i = 0; i < rows.length; i++) {
          var boarddata = {};
          boarddata.idx = encodeURI(rows[i].IDX);
          boarddata.title = encodeURI(rows[i].TITLE);
          boarddata.writer = encodeURI(rows[i].WRITER);
          boarddata.contents = encodeURI(rows[i].CONTENTS);
          boarddata.date = encodeURI(rows[i].date);
          outdata.push(boarddata);
        }
      } catch (error) {
        console.error(error);
      }
    }
  );

  //sql 사용량 체크
  const updatehowusesql = connection.query(
    "update howusesql set count = count + 1 where api='boarddiv'",
    function (err, rows) {
      try {
      } catch (error) {}
    }
  );
  /////////////////////
  res.send(outdata);
});

module.exports = router;
