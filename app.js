import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";

dotenv.config();

// Connection to DB
conn();

const app = express();
const port = process.env.PORT;

// Static Files Middleware
app.use(express.static("public"));

// Template Engine
app.set("view engine", "ejs");

// Routes
app.use("/", pageRoute);

app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});
