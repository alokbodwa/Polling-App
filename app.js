const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// DB Config
require("./config/db");

const app = express();

const poll = require("./routes/poll");

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable cors - it lets you make request from anywhere
app.use(cors());

// setting router
app.use("/poll", poll);

const port = 3000;

// start server
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
