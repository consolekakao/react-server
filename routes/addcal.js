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
router.post("/", function (req, res) {
  console.log(req.body);
  console.log("-------ADD TODO-------");
  connection.query(
    `insert into todo (title,start,end,backgroundcolor,contents,id,private) values('${req.body.title}',
    '${req.body.startdate}','${req.body.enddate}','${req.body.color}','${req.body.contents}','${req.body.id}',
    '${req.body.privated}')`
  );

  res.send(true);
});
module.exports = router;
