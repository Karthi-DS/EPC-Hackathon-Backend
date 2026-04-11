require("dotenv").config();

const express = require("express");
const { db, testDB } = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");

testDB();

const server = express();

server.use("/api",studentRoutes);


server.get("/api/healthCheckUp", (req, res) => {
  res.send("student service is good..");
});

server.listen(process.env.PORT,()=>{
  console.log(`server is running ${process.env.PORT}`)
})