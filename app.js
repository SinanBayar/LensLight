import express from "express";

const app = express();

const port = 3033;

// Static Files Middleware
app.use(express.static('public'))

// Template Engine
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});
