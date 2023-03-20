const express = require("express");
const router = express.Router();
const {
  allJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
router.route("/").post(createJob);
router.route("/all").get(allJobs);
// router.route("/").get(allJobs).post(createJob);
router.route("/:id").get(getSingleJob).patch(updateJob).delete(deleteJob);
module.exports = router;
