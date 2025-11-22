require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const app = express();
app.use(express.json());

// --- SECURITY ---
app.use(helmet());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"]
}));

// RATE LIMIT
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX,
    message: "Too many requests, please try again later!"
});
app.use(limiter);

// LOGGING
app.use(morgan("combined"));

// ROUTER
const productsRoute = require("./routes/products.routes");
app.use("/api/products", productsRoute);

// ==========================
//   API INFO (WAJIB ADA)
// ==========================
app.get("/api/info", (req, res) => {
    res.json({
        service: "Product API Hardening",
        version: "1.0.0",
        author: "NIM ANDA",
        description: "API untuk praktikum Web Service Engineering (WSE) Week 7"
    });
});

// ==========================
//   HEALTH CHECK
// ==========================
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});

// ==========================
//   METRICS MONITORING
// ==========================
app.get("/api/metrics", (req, res) => {
    res.json({
        memory: process.memoryUsage(),
        uptime: process.uptime()
    });
});

// ==========================
//   HANDLER 404 (ANY METHOD)
// ==========================
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ==========================
//   GLOBAL ERROR HANDLER
// ==========================
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// RUNNING SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
