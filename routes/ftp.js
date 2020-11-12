var express = require("express");
var router = express.Router();
const cors = require("cors");
router.use(cors());
const dbconnect = require("./dbconnect.json");
var mysql = require("mysql");
var data = new Array();
///////////////////////////////
var fs = require("fs");
var express = require("express");
var multer = require("multer");
var connection = mysql.createConnection({
  host: dbconnect.host,
  port: dbconnect.port,
  user: dbconnect.user,
  password: dbconnect.password,
  database: dbconnect.database,
  dateStrings: "date",
});
var mysql = require("mysql");
var sftpStorage = require("multer-sftp");
connection.connect();
var storage = sftpStorage({
  sftp: {
    host: dbconnect.host,
    port: "22",
    username: dbconnect.user,
    password: dbconnect.password,
  },
  destination: function (req, file, cb) {
    cb(null, "/");
  },
  filename: function (req, file, cb) {
    var date = Date.now();
    cb(null, date + "_" + file.originalname.replace(/ /gi, "")); //전체 공백제거
  },
});
var upload = multer({ storage: storage });

router.post("/", upload.single("myFile"), function (req, res) {
  data = req.file;
  const id = req.body.userid;
  const originalfilename = decodeURI(data.filename);
  const serverfilename = encodeURI(data.filename);
  const src = __dirname + "\\" + encodeURI(data.filename);
  const public = "0";
  console.log(
    `id= ${id} \n originalname= ${originalfilename} \n serverfilename= ${serverfilename} \n src= ${src}`
  );

  res.write("<html><script>window.close();</script></html>");
});
module.exports = router;
