const mongoose = require("mongoose");

const ClaimLogSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    claimedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ClaimLog", ClaimLogSchema);
