const express = require("express");
const { getAllUser, getAllUsersStatic } = require("../controllers/userTest");
const router = express.Router();

router.route("/").get(getAllUser);
router.route("/static").get(getAllUsersStatic);

module.exports = router;
