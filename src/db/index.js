import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/linkwizard`
    );
    console.log(`\nMongoDB connected: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log("Error connecting to the database", err);
    process.exit(1);
  }
};
export default connectDb;
