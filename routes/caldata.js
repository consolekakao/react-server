var express = require("express");
var router = express.Router();
const cors = require("cors");
router.use(cors());
const dbconnect = require("./dbconnect.json");
var mysql = require("mysql");
var connnection = mysql.createConnection({
  host: dbconnect.host,
  port: dbconnect.port,
  user: dbconnect.user,
  password: dbconnect.password,
  database: dbconnect.database,
});
connnection.connect();

var outdata = [];
router.post("/", function (req, res) {
  const CalendarDataPrivate = connnection.query(
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
          caldata.color = decodeURI(rows[i].backgroundcolor);
          outdata.push(caldata);
        }
      } catch {
        console.log("err caldata");
      }
    }
  );

  const CalendarDataAll = connnection.query(
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

  res.send(outdata);
});
module.exports = router;
