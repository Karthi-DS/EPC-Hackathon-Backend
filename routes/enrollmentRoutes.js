const express = require("express");
const {
  enrollStudent,
  getAllEnrollments,
  unEnrollStudent,
  getStudentEnrollments
} = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/enrollment", enrollStudent);

router.get("/enrollment", getAllEnrollments);

router.get("/enrollment/:id",getStudentEnrollments);

router.delete("/enrollment/:id",unEnrollStudent);

module.exports = router;