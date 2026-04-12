require("dotenv").config();

const express = require("express");
const { db, testDB } = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");

testDB();

const server = express();

server.use(express.json());

// server.use((req, res, next) => {
//   console.log("Incoming:", req.method, req.url);
//   next();
// });

server.get("/api/studentRoute/healthCheckUp", (req, res) => {
  res.send("students service is good..");
});


server.use("/api",studentRoutes);


server.listen(process.env.PORT,()=>{
  console.log(`server is running ${process.env.PORT}`)
})