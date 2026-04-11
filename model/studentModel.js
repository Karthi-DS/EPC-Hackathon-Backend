
const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Student = db.define(
  "students",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password:{
      type: DataTypes.STRING,
      allowNull: false
    },

    department: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "students",
    timestamps: false, // we handle manually
    hooks: {
      beforeUpdate: (student) => {
        student.updated_at = new Date();
      },
    },
  }
);

module.exports = Student;
