const mongoose = require('mongoose');
const {MongoDB_Atlas_Connection} = require("../../secrets")

const URI = MongoDB_Atlas_Connection;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("✅ MongoDB Connected Successfully.");
    } catch (error) {
        console.log("❌ MongoDB Connection Failed.", error)
    }
}

module.exports = {connectDB};