const Student = require("../model/studentModel");
const { signJwt } = require("../middleware/auth"); 

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: {
        student_id: student.student_id,
        name: student.name,
        email: student.email,
        department: student.department,
      },
    });
  } catch (error) {
    console.error("Create student error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create student",
    });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({
      where: { email },
    });

    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    if (password !== student.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = signJwt({
      id: student.student_id,
      email: student.email,
      name: student.name,
    });

    res.cookie("token", token);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const id = req.body.id;
    const student = await Student.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Get student error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch student",
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error("Get all students error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch students",
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const id = req.body.id;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
    });
  } catch (error) {
    console.error("Update student error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update student",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.destroy();

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete student error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete student",
    });
  }
};
