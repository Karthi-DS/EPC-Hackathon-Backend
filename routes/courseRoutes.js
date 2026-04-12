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


router.get("/course/:id", getCourse);


router.put("/course/:id", updateCourse);


router.delete("/course", deleteCourse);

module.exports = router;