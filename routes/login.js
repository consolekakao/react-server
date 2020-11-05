var bodyParser = require("body-parser");
var express = require("express");
var session = require("express-session");
const crypto = require("crypto");
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var mysql = require("mysql");
const cors = require("cors");
const dbconnect = require("./dbconnect.json");
var MySQLStore = require("express-mysql-session")(session);
var option = {
  host: dbconnect.host,
  port: dbconnect.port,
  user: dbconnect.user,
  password: dbconnect.password,
  database: dbconnect.database,
};
var sessionStore = new MySQLStore(option);
router.use(
  session({
    secret: "asdfasffdas",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);
router.use(cors());
var connection = mysql.createConnection({
  host: dbconnect.host,
  port: dbconnect.port,
  user: dbconnect.user,
  password: dbconnect.password,
  database: dbconnect.database,
});

function sha_encryption(data, key) {
  var crypto_sha = crypto.createHmac("sha256", key);
  var hmac_up = crypto_sha.update(data).digest("hex");
  return hmac_up;
}
var result = {};
connection.connect();
router.post("/", (req, res) => {
  var id = req.body.id;
  var pw = req.body.pw;
  var crypto_key = "askjkasnelcm";
  console.log(pw);
  pw = sha_encryption(pw, crypto_key);
  console.log(pw);
  let query = connection.query(
    'select * from USER where id="' + id + '" && pw="' + pw + '";',
    function (err, rows) {
      if (err) throw err;
      if (rows[0]) {
        result = {
          islogin: true,
          userid: encodeURI(rows[0].ID),
          username: encodeURI(rows[0].NAME),
          userdivcode: encodeURI(rows[0].DIVCODE),
          usergrade: encodeURI(rows[0].GRADE),
          userphone: encodeURI(rows[0].PHONE),
          useraddress: encodeURI(rows[0].ADDRESS),
          userjoin_co: encodeURI(rows[0].JOIN_CO),
          userprofilesrc: encodeURI(rows[0].PROFILESRC),
        };
      } else {
        result.islogin = false;
        console.log("fail login");
        console.log("----------------------");
      }
      //sql 사용량 체크
      const updatehowusesql = connection.query(
        "update howusesql set count = count + 1 where api='login'",
        function (err, rows) {
          try {
          } catch (error) {}
        }
      );
      /////////////////////
      res.send(result);
    }
  );
});

module.exports = router;
