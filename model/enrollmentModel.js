const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Enrollment = sequelize.define(
  "enrollments",
  {
    enrollment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    enrollment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "ENROLLED",
    },
  },
  {
    tableName: "enrollments",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["student_id", "course_id"],
      },
    ],
  }
);

module.exports = Enrollment;
