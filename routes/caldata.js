var express = require("express");
var router = express.Router();
const cors = require("cors");
router.use(cors());
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

var outdata = [];
router.post("/", function (req, res) {
  const CalendarDataPrivate = connection.query(
    "select * from todo where id='" + req.body.userid + "'",
    function (err, rows) {
      try {
        if (err) throw err;
        var i;
        outdata = [];
        for (i = 0; i < rows.length; i++) {
          var caldata = {};
          caldata.id = encodeURI(rows[i].idx);
          caldata.title = decodeURI(rows[i].title);
          caldata.date = decodeURI(rows[i].start);
          caldata.end = decodeURI(rows[i].end);
          caldata.contents = decodeURI(rows[i].contents);
          caldata.color = decodeURI(rows[i].backgroundcolor);
          outdata.push(caldata);
        }
      } catch {
        console.log("err caldata");
      }
    }
  );

  const CalendarDataAll = connection.query(
    "select * from todo where private='0' && not id = '" +
      req.body.userid +
      "'",
    function (err, rows) {
      try {
        if (err) throw err;
        var i;
        // outdata = [];
        for (i = 0; i < rows.length; i++) {
          var caldata = {};
          caldata.id = encodeURI(rows[i].idx);
          caldata.title = decodeURI(rows[i].title);
          caldata.date = decodeURI(rows[i].start);
          caldata.end = decodeURI(rows[i].end);
          caldata.color = decodeURI(rows[i].backgroundcolor);
          outdata.push(caldata);
        }
      } catch {
        console.log("err caldata");
      }
    }
  );

  function calendarsql() {
    connection.query(
      "update howusesql set count = count + 1 where api='calendar'",
      function (err, rows) {
        try {
        } catch (error) {}
      }
    );
  }

  res.send(outdata);
});
module.exports = router;
