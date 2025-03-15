const express = require("express");
const { claimCoupon, getAvailableCoupons } = require("../controllers/couponController");
const abusePrevention = require("../middleware/abusePrevention");
const Coupon = require("../models/Coupon");
const ClaimLog = require("../models/ClaimLog");


const router = express.Router();

router.post("/claim", abusePrevention, claimCoupon);
router.get("/available", getAvailableCoupons);

module.exports = router;
