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
});
connection.connect();

var outdata = [];

router.post("/", function (req, res) {
  console.log(req.body.userdiv);
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
          outdata.push(boarddata);
        }
      } catch (error) {
        console.error(error);
      }
    }
  );
  console.log(
    "==============================================================="
  );
  console.log(
    "====================request sql for BoardDiv====================="
  );
  console.log(ss.sql);
  console.log(
    "==============================================================="
  );
  console.log(
    "=====================Response for BoardDiv======================="
  );
  console.log(outdata);
  console.log(
    "==============================================================="
  );
  res.send(outdata);
});

module.exports = router;
