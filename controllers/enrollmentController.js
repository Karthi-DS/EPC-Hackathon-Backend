const Enrollment = require("../model/enrollmentModel");
const axios = require("axios");

// Service URLs
const STUDENT_SERVICE_URL = "http://localhost:3001/student";
const COURSE_SERVICE_URL = "http://localhost:3002/course";

// ENROLL STUDENT
exports.enrollStudent = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;

    // Validate student (using POST so body works)
    const studentResponse = await axios.post(STUDENT_SERVICE_URL, {
      id: student_id,
    });

    if (!studentResponse.data.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid student",
      });
    }

    // Validate course
    const courseResponse = await axios.post(COURSE_SERVICE_URL, {
      id: course_id,
    });

    if (!courseResponse.data.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid course",
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      student_id,
      course_id,
    });

    return res.status(201).json({
      success: true,
      message: "Student enrolled successfully",
      data: enrollment,
    });
  } catch (error) {
    console.error("Enrollment error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to enroll student",
    });
  }
};

// GET ALL ENROLLMENTS
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();

    return res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch enrollments",
    });
  }
};