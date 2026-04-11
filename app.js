require("dotenv").config();

const express = require("express");
const { db, testDB } = require("./config/db");


const server = express();


server.get("/api/healthCheck", (req, res) => {
  res.json({ status: "OK" });
});

