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
router.get("/", function (req, res) {
  var i;
  for (i = 0; i < 5; i++) {
    var dumpsrc = ["src1.png", "src2.png", "src3.png", "src4.png", "src5.png"];
    var dumpname = ["I412", "I311", "I112", "D427", "D112", "A109"];
    var dumpjoin = [
      "2016-02-16",
      "2017-12-04",
      "2010-4-07",
      "2020-02-06",
      "2016-02-16",
      "2018-07-19",
    ];
    var randid = Math.floor(Math.random() * 999) + 1000;
    var randpw = "test";
    var randname = "test" + randid;
    var randgrade = Math.floor(Math.random() * 5) + 1;
    var randphone =
      "010-" +
      (Math.floor(Math.random() * 8999) + 1000) +
      "-" +
      (Math.floor(Math.random() * 8999) + 1000);
    var randaddress = dumpname[Math.floor(Math.random() * 6)];
    var randjoin = dumpjoin[Math.floor(Math.random() * 6)];
    var randdiv = Math.floor(Math.random() * 10) + 1000;
    var randsrc =
      "http://alpcao.cafe24.com/" + dumpsrc[Math.floor(Math.random() * 5)];

    connection.query(
      "insert into USER (ID,PW,NAME,DIVCODE,GRADE,PHONE,ADDRESS,JOIN_CO,PROFILESRC) values('" +
        randid +
        "','" +
        randpw +
        "','" +
        randname +
        "','" +
        randdiv +
        "','" +
        randgrade +
        "','" +
        randphone +
        "','" +
        randaddress +
        "','" +
        randjoin +
        "','" +
        randsrc +
        "')"
    );
  }
  res.send(true);
});
module.exports = router;
