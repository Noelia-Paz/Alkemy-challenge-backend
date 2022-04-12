const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
require("dotenv");

const config = require("../config");

const { User } = require("../database");

router.post("/signup", async (req, res, next) => {
  const { nombreDeUsuario, email, password } = req.body;
  const user = new User({
    nombreDeUsuario,
    email,
    password,
    admin: false,
  });

  await user.save();

  const token = jwt.sign({ id: user.id }, "secret", config.secret, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ auth: true, token });
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findAll({
    where: { email: email },
  });

  if (!user.length) {
    return res.status(404).send("el email no existe");
  }

  const validPassword = await bcrypt.compare(password, user[0].password);
  const isAdmin = user[0].admin;

  if (validPassword && isAdmin) {
    const token = jwt.sign({ id: user.id }, "secret", process.env.SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({ auth: true, token });
  }
});

module.exports = router;
