const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({ name, email, password: hashedPw });
      return user.save();
    })
    .then(result => {
      res.status(201).send("user created!");
    })
    .catch(err => console.log(err));
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loggedUser;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        console.log("user with email doesnt exist");
        return;
      }
      loggedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(equal => {
      if (!equal) {
        console.log("password dont match");
        return;
      }

      const token = jwt.sign(
        {
          email: loggedUser.email,
          userId: loggedUser._id.toString()
        },
        "secretpassword",
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "logged in!", token });
    })
    .catch(err => {
      console.log(err);
    });
};
