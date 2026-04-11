require("dotenv").config();

const express = require("express");
const { db, testDB } = require("./config/db");

testDB();

const server = express();

server.get("/api/",(req,res)=>{
  res.send("testing service is running");
})

server.get("/api/courses/healthCheck", (req, res) => {
  res.send("service is good..");
});

server.listen(process.env.PORT,()=>{
  console.log(`server is running ${process.env.PORT}`)
})
