require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const cors = require("cors");



const services = {
  course: "https://backend-1-sl3y.onrender.com",
  student: "https://backend-2-ugop.onrender.com",
  enrollment: "https://backend-3-h5fx.onrender.com",
};

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));

app.use("/api", (req, res, next) => {
  const path = req.originalUrl.replace(/^\/api\/?/, "");

  if (!path) {
    return res.status(400).json({ error: "API path required" });
  }

  const parts = path.split("/");
  const apiType = parts[0];

  console.log("👉 Incoming:", req.method, req.originalUrl);
  console.log("👉 API Type:", apiType);

  if (!services[apiType]) {
    return res.status(400).json({ error: "Invalid API type" });
  }

  const target = services[apiType];

  console.log("Forwarding to:", `${target}/api/${path}`);

  return createProxyMiddleware({
    target,
    changeOrigin: true,

    pathRewrite: () => `/api/${path}`,

    onProxyReq: (proxyReq, req, res) => {
      console.log("🚀 Proxying:", req.method, `/api/${path}`);
    },

    onError: (err, req, res) => {
      console.error("❌ Proxy Error:", err.message);
      res.status(500).json({ error: "Gateway error" });
    },
  })(req, res, next);
});

app.get("/", (req, res) => {
  res.send("API Gateway Running 🚀");
});

app.listen(5000, () => {
  console.log("Gateway running on port 5000");
});