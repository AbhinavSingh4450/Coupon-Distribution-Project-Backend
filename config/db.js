const mongoose = require("mongoose");

const connectDB = async () => {
      if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB");
        return;
      }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
      connectTimeoutMS: 10000, 
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Failed:", error.message);
        throw new Error("Database Connection Failed");
    }
};

module.exports = connectDB;
