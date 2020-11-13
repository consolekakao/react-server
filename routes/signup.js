const express = require("express");
const dbconnect = require("./dbconnect.json");
var router = express.Router();
var mysql = require("mysql");
const cors = require("cors");
const crypto = require("crypto");

var connection = mysql.createConnection({
  host: dbconnect.host,
  port: dbconnect.port,
  user: dbconnect.user,
  password: dbconnect.password,
  database: dbconnect.database,
});
connection.connect();

router.post("/", function (req, res) {
  var date = new Date();

  var id = req.body.id;
  var pwd = req.body.pw;
  var ck_pwd = req.body.ck_pw;
  var name = req.body.name;
  var DivCode = req.body.DIV;
  var phone = req.body.phone;
  var adress = req.body.adress;
  var join_time =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  var imgfile = req.file;
  function ck_data(value, dataname) {
    // 비어있는거 체크
    console.log("--------ck_data--------");
    if (value == "") {
      res.send('<script>alert(dataname + "입력해주세요!");</script>');
      return false;
    }
    console.log("ck_data 통과");
    console.log("------------------------");
    return true;
  }

  function ck_exist(ID) {
    console.log("---------ck_exist----------");
    var sql = "SELECT COUNT(ID) as count FROM USER WHERE ID='" + ID + "';";
    connection.query(sql, (err, rows) => {
      if (rows[0].count) {
        console.log(sql);
        console.log("같은거 있음");
        res.send('<script>alert("동일한 아이디가 존재합니다.");</script>');
        return false;
      }
    });
    return true;
  }

  function ck_UserID(ID) {
    // 아이디 확인(비었는지?, 정규식에 맞게 적었는지?)
    console.log("--------ck_UserID--------");
    if (!ck_data(ID, "아이디를")) {
      console.log("ck_UserID 빈칸 확인");
      return false;
    }

    var regul_ID = /^[a-zA-Z0-9]{4,12}$/;
    if (!regul_ID.test(ID)) {
      console.log("ID 정규화 확인");
      console.log("아이디 검색결과 같은 아이디 없음");
      res.send(
        '<script>alert("아이디는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!");</script>'
      );
      return false;
    }
    console.log("ck_UserID 통과");
    console.log("------------------------");
    return true;
  }

  function ck_passwd(ID, password, ck_password) {
    // 비밀번호 확인(비었는지?, 정규식에 맞게 적었는지?, 비밀번호와 비밀번호확인에 적은것이 같은지?, id와 비밀번호가 같은지?)
    console.log("--------ck_passwd--------");
    if (!ck_data(password, "비밀번호를")) {
      console.log("password 빈칸 확인");
      return false;
    }

    if (!ck_data(ck_password, "비밀번호 확인을")) {
      console.log("ck_password 빈칸검색 실행");
      return false;
    }

    var regul_pwd = /^[a-zA-Z0-9]{4,12}$/;
    if (!regul_pwd.test(password)) {
      console.log("비밀번호 정규화 확인 실행");
      res.send(
        '<script>alert("비밀번호는 영문 대소문자와 숫자 4~12자리로 입력해야합니다!");</script>'
      );
      return false;
    }

    if (password != ck_password) {
      console.log("비밀번호와 비밀번호 확인 비교");
      res.send('<script>alert("두 비밀번호가 맞지 않습니다.");</script>');
      return false;
    }
    console.log(ID, password);
    if (ID == password) {
      console.log("비밀번호와 ID가 같은지 확인");
      res.send(
        '<script>alert("아이디와 비밀번호는 같을 수 없습니다!");</script>'
      );
      return false;
    }
    console.log("ck_passwd 통과");
    console.log("------------------------");
    return true;
  }

  function ck_name(name) {
    // 이름 확인(비었는지?, 정규식에 맞게 적었는지?)
    console.log("--------ck_name--------");
    if (!ck_data(name, "이름을")) return false;
    var regul_name = /^[a-zA-Z가-힣]/;
    if (!regul_name.test(name)) {
      res.send('<script>alert("이름이 올바르지 않습니다.");</script>');
      return false;
    }
    console.log("ck_name 통과");
    console.log("------------------------");
    return true;
  }

  function ck_DIV(dc) {
    //부서 확인(0이면 선택안된 상태)
    console.log("--------ck_DIV--------");
    var divcode = req.body.DIV.value;
    if (divcode == "0") {
      res.send('<script>alert("부서를 선택해주세요");</script>');
      return false;
    }
    console.log("ck_DIV 통과");
    console.log("------------------------");
    return true;
  }

  function ck_phone(ph) {
    //전화번호 확인(비었는지?, 정규식에 맞게 적었는지?)
    console.log("--------ck_phone--------");
    if (!ck_data(ph, "전화번호를")) {
      return false;
    }
    var regul_ph = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    if (!regul_ph.test(ph)) {
      res.send(
        '<script>alert("잘못된 휴대폰 전호입니다. 숫자, - 를 포함한 숫자만 입력하세요.")</script>'
      );
      return false;
    }
    console.log("ck_phone 통과");
    console.log("------------------------");
    return true;
  }

  function ck_email(em) {
    // 이메일 확인(비었는지?, 정규식에 맞게 적었는지?)
    console.log("--------ck_email--------");
    if (!ck_data(em, "이메일을")) {
      return false;
    }

    var regul_em = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!regul_em.test(em)) {
      res.send('<script>alert("잘못된 이메일 주소입니다.")</script>');
      return false;
    }
    console.log("ck_email 통과");
    console.log("------------------------");
    return true;
  }

  function ck_All() {
    console.log("ck_All 실행");
    if (!ck_exist(id)) {
      console.log("ck_exist");
      return false;
    }
    if (!ck_UserID(id)) {
      return false;
    }
    if (!ck_passwd(id, pwd, ck_pwd)) {
      return false;
    }
    if (!ck_name(name)) {
      return false;
    }
    if (!ck_DIV(DivCode)) {
      return false;
    }
    if (!ck_phone(phone)) {
      return false;
    }
    if (!ck_email(adress)) {
      return false;
    }
    return true;
  }

  console.log("-----유저 정보-----");
  User = {
    id: id,
    pw: pwd,
    ck_pw: ck_pwd,
    name: name,
    DIV: DivCode,
    phone: phone,
    adress: adress,
    join_time: join_time,
  };
  console.log(User);
  console.log("------------------");

  function sha_encryption(data, key) {
    var crypto_sha = crypto.createHmac("sha256", key);
    var hmac_up = crypto_sha.update(data).digest("hex");
    return hmac_up;
  }
  if (ck_All()) {
    var sql =
      "INSERT INTO USER(ID,PW,NAME,DIVCODE,PHONE,ADDRESS,JOIN_CO) VALUES (?,?,?,?,?,?,?);";
    var params = [
      id,
      sha_encryption(User.pw, "askjkasnelcm"),
      name,
      DivCode,
      phone,
      adress,
      join_time,
    ];
    var crypto_key = "askjkasnelcm";

    var query = connection.query(sql, params, (err, rows) => {
      console.log("회원가입 성공");
      console.log(query.sql);
      return 0;
    });
  } else {
    console.log("회원가입 실패");
  }
  res.redirect(`http://172.22.200.49:3000/`);
});

module.exports = router;
