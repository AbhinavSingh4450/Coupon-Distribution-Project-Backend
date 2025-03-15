const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/coupons", require("./routes/addCoupon"));

// Check if running on Vercel (Serverless) or locally
if (process.env.VERCEL) {
  const serverless = require("serverless-http");
  module.exports = app;
  module.exports.handler = serverless(app);
} else {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
