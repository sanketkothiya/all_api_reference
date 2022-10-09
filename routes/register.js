const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Refresh = require('../models/refresh')
router.post("/", (req, res) => {
  // Authorize request

  // validate request
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "All fields are required" });
  }
  // check if user exist
  User.exists({ email: email }, async (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Something Went Wrong " });
    }
    if (result) {
      return res
        .status(422)
        .json({ error: "user with this email already exists " });
    } else {
      // hash password
      const hasedpassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hasedpassword,
      });

      user
        .save()
        .then((user) => {
          // jwt
          const accessToken = jwt.sign(
            {
              id: user._id,
              name: user.name,
              email: user.email,
            },
            process.env.JWT_SECRET, { expiresIn: '1h' }
          );

          // refresh token
          const refreshToken = jwt.sign(
            {
              id: user._id,
              name: user.name,
              email: user.email,
            },
            process.env.REFRESH_SECRET
          );

          new Refresh({
            token: refreshToken

          }).save().then(() => {
            return res.send({
              accessToken: accessToken,
              refreshToken: refreshToken,
              type: "Bearer",
            });

          })
        })
        .catch((err) => {
          return res.status(500).send({ error: "something went wrong" });
        });
    }
  });
});

module.exports = router;
