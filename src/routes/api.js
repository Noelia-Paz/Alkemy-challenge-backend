const router = require("express").Router();

const blogControllers = require("../controllers/blog");

router.use("/blog", blogControllers);

const userControllers = require("../controllers/authController");

router.use("/user", userControllers);

module.exports = router;
