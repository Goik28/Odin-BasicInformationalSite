import express from "express";
import fs from "fs/promises";

const app = express();
const port = process.env.PORT || 3000;

const index = await fs.readFile("./index.html", "utf-8");
const about = await fs.readFile("./about.html", "utf-8");
const contact = await fs.readFile("./contact-me.html", "utf-8");
const fourOhFour = await fs.readFile("./404.html", "utf-8");
const style = await fs.readFile("./style.css", "utf-8");

app.get("/style.css", (req, res) => {
  res.type("text/css");
  res.end(style);
});

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.get("/index.html", (req, res) => {
  res.send(index);
});

app.get("/about.html", (req, res) => {
  res.send(about);
});

app.get("/contact-me.html", (req, res) => {
  res.send(contact);
});

app.get("/404.html",(req, res) => {
  res.status(404).send(fourOhFour);
});

app.get("*", (req, res) => {
  res.redirect("/404.html");
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
