const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Update frontend URL when deployed
    credentials: true
}));
app.use(cookieParser());

app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/coupons", require("./routes/addCoupon"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
