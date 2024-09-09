import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
//1.Get all the users saved in the database
export async function GET() {
  let users = [];
  try {
    users = await User.find().select(-password);
    if (users) {
      return NextResponse.json({
        message: "users successfully retrieved",
        users,
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "can't retrieved the users an error occured ",
      success: false,
    });
  }
}
