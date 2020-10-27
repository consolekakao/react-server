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
  const CalendarData = connnection.query("select * from todo", function (
    err,
    rows
  ) {
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

      console.log(
        "====================================================================="
      );
      console.log(
        "====================request sql for CalendarData====================="
      );
      console.log(CalendarData.sql);
      console.log(
        "====================================================================="
      );
      console.log(
        "=====================Response for CalendarData======================="
      );
      console.log(outdata);
      console.log(
        "====================================================================="
      );
    } catch {
      console.log("err caldata");
    }
  });
  res.send(outdata);
});
module.exports = router;
