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
  dateStrings: "date",
});
connection.connect();

var outdata = [];

router.post("/", function (req, res) {
  const ss = connection.query(
    "SELECT * FROM BOARD where public = '" + req.body.userdiv + "' limit 20;",
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
          boarddata.date = encodeURI(rows[i].date)
            .substring(5, 18)
            .replace("-", ".");
          outdata.push(boarddata);
        }
      } catch (error) {
        console.error(error);
      }
    }
  );

  res.send(outdata);
});

module.exports = router;
