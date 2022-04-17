const router = require("express").Router();

const blogControllers = require("../controllers/blogController");
const userControllers = require("../controllers/authController");

router.use("/blog", blogControllers);
router.use("/user", userControllers);

module.exports = router;
