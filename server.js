const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const boardall = require("./routes/boardall.js");
const boarddiv = require("./routes/boarddiv.js");
const calendar = require("./routes/caldata.js");
const addcalendar = require("./routes/addcal.js");
const login = require("./routes/login.js");
const dump = require("./routes/dumpuser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/boardall", boardall);
app.use("/boarddiv", boarddiv);
app.use("/cal", calendar);
app.use("/addcalendar", addcalendar);
app.use("/login", login);
//app.use("/dump", dump);
const port = 3002;
app.listen(port, () => console.log(`Start Node ${port}`));
