const router = require("express").Router();
// const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/", (req, res) => {
  // validate request

  const { email, password } = req.body;
  console.log(req.body)

  if (!email || !password) {
    return res.status(422).json({ error: "All fields are required" });
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    }
    console.log(user.password);
    if (user) {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          const accessToken = jwt.sign(
            {
              id: User._id,
              name: User.name,
              email: User.email,
            },
            process.env.JWT_SECRET, { expiresIn: '30s' }
          )
          return res.send({
            accessToken: accessToken,
            type: "Bearer",
          });
        }
        return res
          .status(401)
          .json({ error: "email and password are wrong" });

      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.status(401).json({ error: "email and password are wrong" });
    }
  });
});

module.exports = router;
