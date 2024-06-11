// Basic library import
const express = require("express");
const app = express();
const router = require("./src/routes/api");

// require dotenv 
require('dotenv').config()

// Middleware library import
const cors = require("cors");
const hpp = require("hpp");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

// Security middleware implement
app.use(cors());
app.use(hpp());
app.use(morgan("dev"));
app.use(helmet());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter)

// Routing Implement
app.use('/api/v1', router)

// Undefined route implement
app.use('*', (req, res)=>{
    res.status(404).json({
        status: "Fail",
        message: "Not Found"
    })
})

module.exports = app;