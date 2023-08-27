import express from "express";

const app = express();

const port = 3033;

app.get("/", (req, res) => {
  res.send("INDEX SAYFASI");
});

app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});
