const express = require("express");
const {
  getAllUser,
  getAllUsersStatic,
  getSingleUser,
} = require("../controllers/userTest");
const router = express.Router();

router.route("/").get(getAllUser);
router.route("/:id").get(getSingleUser);
router.route("/static").get(getAllUsersStatic);

module.exports = router;
