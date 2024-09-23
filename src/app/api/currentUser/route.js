import { connectDb } from "@/helper/db";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
connectDb();
export async function GET(request) {
  const AUTH_TOKEN = request.cookies?.get("authToken")?.value;
  try {
    if (AUTH_TOKEN) {
      const id = jwt.verify(AUTH_TOKEN, process.env.SECRET_KEY).id;
      const user = await User.findById(id);
      if (user) {
        return NextResponse.json({ success: true, data: user });
      } else {
        return NextResponse.json({ success: false, message: "User not found" });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Authorization token is missing",
      });
    }
  } catch (error) {
    console.error("Server Error", error);
    return NextResponse.json({
      success: false,
      message: "Invalid token or server error",
    });
  }
}
