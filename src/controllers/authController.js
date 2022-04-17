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
    return res.json({
      status: 404,
      message: "El email no existe",
    });
  }

  const validPassword = await bcrypt.compare(password, user[0].password);

  if (!validPassword) {
    return res.json({
      status: 404,
      message: "La contrasena es incorrecta",
    });
  }

  const isAdmin = user[0].admin;

  if (validPassword && isAdmin) {
    const token = jwt.sign(
      { isAdmin: user[0].admin },
      "secret",
      config.secret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.json({ auth: true, token });
  }
});

module.exports = router;
