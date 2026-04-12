require("dotenv").config();

const express = require("express");
const { db, testDB } = require("./config/db");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

testDB();

const server = express();


server.use(express.json());

server.get("/api/enrollment/healthCheckUp", (req, res) => {
  res.send("Enrollment service is good..");
});

server.use("/api",enrollmentRoutes);

server.listen(process.env.PORT,()=>{
  console.log(`server is running ${process.env.PORT}`)
})