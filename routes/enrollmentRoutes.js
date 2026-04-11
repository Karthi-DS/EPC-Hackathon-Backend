const express = require("express");
const {
  enrollStudent,
  getAllEnrollments
} = require("../controllers/enrollmentController");

const router = express.Router();

// ENROLL STUDENT
router.post("/enrollment", enrollStudent);

// GET ALL ENROLLMENTS
router.get("/enrollment/all", getAllEnrollments);

module.exports = router;