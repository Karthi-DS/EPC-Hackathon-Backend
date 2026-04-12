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

router.put("/student/:id", updateStudent);

router.delete("/student/:id", deleteStudent);


module.exports = router;