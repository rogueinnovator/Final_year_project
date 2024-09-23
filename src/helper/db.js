"use server";
import mongoose from "mongoose";

let isConnected = false;
const mongoUrl = process.env.MONGO_DB_URL;

export const connectDb = async () => {
  if (isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    console.log("Attempting to connect to DB...");
    const { connection } = await mongoose.connect(mongoUrl, {
      dbName: "CIMS",
    });
    isConnected = true;
    console.log("Connected to DB on the host", connection.host);
  } catch (error) {
    console.log("Cannot connect to DB, an error occurred");
    console.error(error);
  }
};
