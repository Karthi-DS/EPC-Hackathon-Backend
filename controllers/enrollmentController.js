const Enrollment = require("../model/enrollmentModel");

const STUDENT_SERVICE_URL = process.env.STUDENT_SERVICE_URL;
const COURSE_SERVICE_URL = process.env.COURSE_SERVICE_URL;

exports.enrollStudent = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;

    const studentResponse = await fetch(STUDENT_SERVICE_URL+"/api/student/"+student_id);
    console.log(studentResponse);
    if (!studentResponse.ok) {
      return res.status(400).json({
        success: false,
        message: "Invalid student",
      });
    }

    const courseResponse = await fetch(COURSE_SERVICE_URL+"/api/course/"+course_id);

    if (!courseResponse.ok) {
      return res.status(400).json({
        success: false,
        message: "Invalid course",
      });
    }

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

exports.getStudentEnrollments = async (req, res) =>{
  try {
    const enrollments = await Enrollment.findAll({student_id:req.params.id});

    return res.status(200).json({
      success: true,
      student_id:req.params.id,
      data: enrollments,
    });
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch enrollments",
    });
  }
}

exports.unEnrollStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    await enrollment.destroy();

    return res.status(200).json({
      success: true,
      message: "Unenrolled successfully",
    });

  } catch (error) {
    console.error("Unenroll error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to unenroll",
    });
  }
};