import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";

dotenv.config();

// Connection to DB
conn();

const app = express();

const port = process.env.PORT;

// Static Files Middleware
app.use(express.static("public"));

// Template Engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});
