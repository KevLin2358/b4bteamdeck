const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

router.get("/test", (req, res) => {
  res.json({msg: "This is the user route"});
});

router.post('/register', (req, res) => {
  User.findOne({username: req.body.username})
    .then(user => {
      if(user){
        return res.status(400).json({username: " a user is already registered with that username"})
      } else{
        const newUser = new User({
          handle: req.body.handle,
          username: req.body.username,
          password: req.body.password
        })
        
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash)=> {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then((user) => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

module.exports = router;
