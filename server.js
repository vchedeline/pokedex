require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8008;
const morgan = require("morgan");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("main.ejs");
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} now in session...`);
});
