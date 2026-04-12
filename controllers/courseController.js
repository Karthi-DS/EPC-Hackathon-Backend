const Course = require("../model/courseModel");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: {
        course_id: course.course_id,
        course_name: course.course_name,
        course_code: course.course_code,
        credits: course.credits,
      },
    });
  } catch (error) {
    console.error("Create course error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create course",
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Get course error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch course",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Get all courses error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch courses",
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error("Update course error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update course",
    });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.destroy();

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete course",
    });
  }
};