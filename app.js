const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

const users = require("./routes/api/users");
const User = require("./models/User");

const decks = require("./routes/api/decks");
const cards = require("./routes/api/cards");

const bodyParser = require('body-parser');

mongoose
  .connect(db,{useNewUrlParser: true})
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));


app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const user = new User({
    handle: "Kev#4156",
    username: "kev",
    password: "kevkev"
  })
  user.save();
  res.send("Hello World!");
});

app.use("/api/users", users);
app.use("/api/decks", decks);
app.use("/api/cards", cards);

const port = process.env.PORT || 5001;

app.listen(port, () => {console.log(`Listening on port ${port}`)});