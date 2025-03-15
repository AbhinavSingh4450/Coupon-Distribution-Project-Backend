const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

const isVercel=!!process.env.VERCEL;

const allowedOrigins=["http://localhost:5173", "https://coupon-distribution-project-frontend-ax3x.vercel.app/"]


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PATCH,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);


app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("All is Well!");
});
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/coupons", require("./routes/addCoupon"));

const PORT = process.env.PORT || 5000;


app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 0) {
    try {
      await connectDB();
    } catch (err) {
      console.error("Database Connection Failed:", err);
      return res.status(500).json({ error: "Database Connection Failed" });
    }
  }
  next();
});


if (isVercel) {
  module.exports = async (req, res) => {
    try {
      if (mongoose.connection.readyState === 0) await connectDB();
      return app(req, res);
    } catch (err) {
      console.error("Vercel API Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
} else {

  connectDB()
    .then(() => {
      console.log("MongoDB Connected Successfully");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Cannot connect to DB:", err);
      process.exit(1);
    });
}

