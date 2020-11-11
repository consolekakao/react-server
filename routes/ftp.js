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
    host: "183.111.199.157",
    port: "22",
    username: "alpacao",
    password: "alpaca16",
  },
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // /upload 부분을 다른 부분으로 바꾸면 파일의 저장 경로을 바꿀 수 있다.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage });
router.get("/upload", (req, res) => {
  res.render("upload");
});
router.get("/", function (req, res) {
  fs.readFile("index.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

router.post("/", upload.single("myFile"), function (req, res) {
  data = req.file;

  file_destination = data.destination; // 파일이 가는 원격 저장소 경로
  file_originalname = data.originalname; // 파일의 원래이름과 확장자명
  upload_name = data.filename; //파일이 업로드 될때 이름
  upload_fullpath = data.path; //파일이 업로드 되는 폴더의 경로 파일 이름과 확장자명.

  console.log("---------------------------");
  console.log("---------------------------");
  console.log("---------------------------");
  console.log("---------------------------");
  console.log("이건 upload_fullpath " + "\n" + upload_fullpath);

  console.log("---------------------------");
  console.log("이건 upload_originalname " + "\n" + file_originalname);

  console.log("---------------------------");
  console.log("이건 upload_name " + "\n" + upload_name);

  console.log("---------------------------");
  console.log("이건 file_destination " + "\n" + file_destination);

  res.send("upload 성공 입니다.");
});
module.exports = router;
