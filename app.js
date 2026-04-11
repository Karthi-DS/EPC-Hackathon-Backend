require("dotenv").config();

const express = require("express");
const { db, testDB } = require("./config/db");

testDB();

const server = express();


server.get("/api/courses/healthCheck", (req, res) => {
  res.json({ status: "OK" });
});

server.listen(process.env.PORT,()=>{
  console.log(`server is running ${process.env.PORT}`)
})
