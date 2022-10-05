const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connect } = require("./database/dbconection");
const user = require("./router/user.router");

const app = express();

connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/api", user);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
