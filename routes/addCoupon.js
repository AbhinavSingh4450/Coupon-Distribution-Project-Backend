const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

// API to add new coupons
router.post("/addCoupon", async (req, res) => {
    try {
        const { codes } = req.body; // Expecting an array of coupon codes

        if (!codes || !Array.isArray(codes) || codes.length === 0) {
            return res.status(400).json({ message: "Invalid input. Provide an array of coupon codes." });
        }

        const coupons = codes.map(code => ({ code, claimed: false }));

        await Coupon.insertMany(coupons);

        res.status(201).json({ message: "Coupons added successfully!", coupons });
    } catch (error) {
        console.error("Error adding coupons:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
