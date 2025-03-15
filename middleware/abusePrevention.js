const ClaimLog = require("../models/ClaimLog");

const abusePrevention = async (req, res, next) => {
    const userIP = req.ip;
    const oneHourAgo = new Date(Date.now() - 5 * 60 * 1000);

    const lastClaim = await ClaimLog.findOne({ ip: userIP }).sort({ claimedAt: -1 });

    if (lastClaim && lastClaim.claimedAt > oneHourAgo) {
        const remainingTime = Math.ceil((lastClaim.claimedAt.getTime() + 5 * 60 * 1000 - Date.now()) / 60000);
        return res.status(429).json({ message: `You can claim another coupon in ${remainingTime} minutes.` });
    }

    next();
};

module.exports = abusePrevention;
