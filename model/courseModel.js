
const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Course = db.define(
  "course",
  {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    course_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "course",
    timestamps: false,
    hooks: {
      beforeUpdate: (course) => {
        course.updated_at = new Date();
      },
    },
  }
);

module.exports = Course;
