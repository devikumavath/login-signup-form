const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const { assert } = require("console");
const templatePath = path.join(__dirname, "./templates");

// require('.')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatePath);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
  });

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  await collection.insertMany([data]);

  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const checkUser = await collection.findOne({ name: req.body.name });

    if (checkUser.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch (error) {
    res.send("email/password wrong");
  }
});

app.listen(3000, () => {
  console.log(`listening on port ${'http://127.0.0.1:3000/'} `);
});
