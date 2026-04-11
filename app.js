const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(express.json());

const services = {
  student: "https://backend-1-sl3y.onrender.com",
  course: "https://backend-2-ugop.onrender.com",
  enrollment: "https://backend-3-h5fx.onrender.com"
};

app.use("/api", (req, res, next) => {
  const apiType = req.body.api || req.query.api;

  if (!apiType || !services[apiType]) {
    return res.status(400).json({ error: "Invalid API type" });
  }

  const target = services[apiType];

  return createProxyMiddleware({
    target,
    changeOrigin: true,

    pathRewrite: (path, req) => {
      return `/${apiType}`; 
    },

    onProxyReq: (proxyReq, req, res) => {
      if (req.body && req.body.api) {
        delete req.body.api;

        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    }

  })(req, res, next);
});

app.get("/", (req, res) => {
  res.send("API Gateway Running");
});

app.listen(5000, () => {
  console.log("Gateway running on port 5000");
});