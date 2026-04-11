const express = require("express");
const {
  createCourse,
  getCourse,
  getAllCourses,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

const router = express.Router();


router.post("/course", createCourse);


router.get("/course/all", getAllCourses);


router.get("/course", getCourse);


router.put("/course", updateCourse);


router.delete("/course", deleteCourse);

module.exports = router;