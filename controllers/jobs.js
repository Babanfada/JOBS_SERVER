const JOBS = require("../models/jobs");
const { StatusCodes } = require("http-status-codes");
const {
  BADREQUESTERROR,
  NOTFOUNDERROR,
  UNAUTHORIZEDERROR,
  CUSTOMERROR,
} = require("../errors");

const allJobs = async (req, res) => {
  console.log("jnjnisnvi");
  const jobs = await JOBS.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, nbHit: jobs.length });
};
const getSingleJob = async (req, res) => {
  console.log(req.user);
  const { id: JobId } = req.params;
  const { id: userId } = req.user;
  const Job = await JOBS.findById({ _id: JobId, createdBy: userId });
  if (!Job) {
    throw new NOTFOUNDERROR(`The job with the id of ${JobId} can not be found`);
  }
  res.status(StatusCodes.OK).json({ Job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await JOBS.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id: JobId } = req.params;
  const { id: userId } = req.user;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BADREQUESTERROR(`Company and Position Fields can not be empty`);
  }
  const updatedJob = await JOBS.findByIdAndUpdate(
    { _id: JobId, createdBy: userId },
    req.body,
    { new: true, runValidator: true }
  );
  console.log(req.body);
  res.status(StatusCodes.OK).json({ updatedJob });
  // res.send("@send")
};
const deleteJob = async (req, res) => {
  const { id: JobId } = req.params;
  const { id: userId } = req.user;
  const deletedJob = await JOBS.findByIdAndRemove({
    _id: JobId,
    createdBy: userId,
  });
  res.status(StatusCodes.OK).send(`${JobId} successfully deleted`);
};

module.exports = {
  allJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
