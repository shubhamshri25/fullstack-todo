const mongoose = require("mongoose");

const connectionString = process.env.MONGO_DB_URI;

const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDb connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

module.exports = connectMongodb;
