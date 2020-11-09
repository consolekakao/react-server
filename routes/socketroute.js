var express = require("express");
var router = express.Router();

function whatapi(requestapi, data) {
  if (requestapi == "requestboarddiv") {
    var userid = data.userid;
    var userdiv = data.userdiv;
    console.log("userid:   " + userid + userdiv);
  }
}

module.exports = router;
