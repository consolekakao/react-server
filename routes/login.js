var bodyParser = require("body-parser");
var express = require("express");
var session = require("express-session");
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
var result = {};
connection.connect();
router.post("/", (req, res) => {
  let query = connection.query(
    'select * from USER where id="' +
      req.body.id +
      '" && pw="' +
      req.body.pw +
      '";',
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
      res.send(result);
    }
  );
});

module.exports = router;
