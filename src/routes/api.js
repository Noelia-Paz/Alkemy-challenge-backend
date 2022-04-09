const router = require("express").Router();

const apiBlogsRouter = require("./api/blog");

router.use("/blog", apiBlogsRouter);

module.exports = router;
