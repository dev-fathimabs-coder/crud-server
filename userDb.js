let mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Users");
        console.log( "Users is Connected");
    } catch (err) {
        console.error("Connection Error", err);
        process.exit(1);
    }
}

module.exports = connectDb;