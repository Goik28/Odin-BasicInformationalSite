import { createServer } from "http";
import fs from "fs/promises";

const port = process.env.PORT || 3000;

const index = await fs.readFile("./index.html", "utf-8");
const about = await fs.readFile("./about.html", "utf-8");
const contact = await fs.readFile("./contact-me.html", "utf-8");
const fourOhFour = await fs.readFile("./404.html", "utf-8");
const style = await fs.readFile("./style.css", "utf-8");

const server = createServer((req, response) => {
  if (req.url.includes("/style.css")) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.end(style);
    return;
  }
  if (req.url == "/") {
    response.writeHead(302, {      
      location: "/index.html",
    });
    response.end(index);
    return;
  }
  if (req.url.includes("/index.html")) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(index);
    return;
  }
  if (req.url.includes("/about.html")) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(about);
    return;
  }
  if (req.url.includes("/contact-me.html")) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(contact);
    return;
  } else {
    response.statusCode = 404
    response.setHeader("Content-Type", "text/html");
    response.setHeader("Location", "/404");
    response.end(fourOhFour);
    return;
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
