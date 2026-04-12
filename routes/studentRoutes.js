const express = require("express");
const {
  createStudent,
  loginStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

const router = express.Router();

router.post("/student", createStudent);

router.post("/student/login", loginStudent);

router.get("/student", getAllStudents);

router.get("/student/:id", getStudent);

router.put("/student", updateStudent);

router.delete("/student", deleteStudent);


module.exports = router;