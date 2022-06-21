const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

const users = require("./routes/api/users");
const decks = require("./routes/api/decks");
const cards = require("./routes/api/cards");


mongoose.connect(db,{useNewUrlParser: true})
.then(() => console.log("Connected to mongoDB"))
.catch(err => console.log(err));


app.get("/", (req, res) => {

  res.send("Hello World!");
});

app.use("/api/users", users);
app.use("/api/decks", decks);
app.use("/api/cards", cards);


const port = process.env.PORT || 5001;

app.listen(port, () => {console.log(`Listening on port ${port}`)});