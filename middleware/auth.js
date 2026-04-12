const jwt = require("jsonwebtoken");

const signJwt = (student, expires = "7d") => {
  return jwt.sign(
    {
      student_name: student.name,
      student_email: student.email,
      student_id: student.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: expires }
  );
};


const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};


const verifyJwt  = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = req.cookies?.token || (authHeader && authHeader.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  try {
    const decoded = verify(token);

    req.student = {
      student_name: decoded.student_name,
      student_email: decoded.student_email,
      student_role: decoded.student_role ?? decoded.role,
      student_id: decoded.student_id ?? decoded.id,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token. Please log in." });
    }

    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  signJwt,
  verifyJwt, 
};