require("dotenv").config();

const express = require("express");
const { db, testDB } = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");

testDB();

const server = express();


server.use(express.json());

// Root route
// server.get("/", (req, res) => {
//   res.send("Course Service running 🚀");
// });

server.use("/api", courseRoutes);

server.get("/api/courses/healthCheck", (req, res) => {
  res.send("service is good..");
});

server.use("/", courseRoutes);

server.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT}`);
});