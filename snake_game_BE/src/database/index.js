import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const main = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("connected to MongoDB");
  } catch (err) {
    console.log(err.message);
  }
};

export default main;
