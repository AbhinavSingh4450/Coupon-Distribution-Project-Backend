
const Coupon = require("../models/Coupon");
const ClaimLog = require("../models/ClaimLog");

let lastClaimedIndex = -1; // Tracks the last claimed coupon index

exports.claimCoupon = async (req, res) => {
    try {
        const userIP = req.ip;

        // Fetch all coupons (both claimed and unclaimed) sorted by _id
        let coupons = await Coupon.find().sort({ _id: 1 });

        if (coupons.length === 0) {
            return res.status(400).json({ message: "No coupons available." });
        }

        // Check if all coupons are claimed
        const allClaimed = coupons.every(coupon => coupon.claimed);

        if (allClaimed) {
            // Reset all coupons to unclaimed if all are claimed
            await Coupon.updateMany({}, { claimed: false });
            coupons = await Coupon.find().sort({ _id: 1 }); // Refetch the coupons
        }

        // Implement Round Robin Logic
        lastClaimedIndex = (lastClaimedIndex + 1) % coupons.length;
        const selectedCoupon = coupons[lastClaimedIndex];

        // Mark the selected coupon as claimed
        selectedCoupon.claimed = true;
        await selectedCoupon.save();

        // Log claim attempt
        await ClaimLog.create({ ip: userIP });

        res.json({ message: "Coupon claimed successfully!", coupon: selectedCoupon.code });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAvailableCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({ claimed: false });
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
