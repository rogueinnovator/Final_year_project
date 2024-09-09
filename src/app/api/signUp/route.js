import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/helper/db";
connectDb(); //fucntion to connect to database
export async function POST(request) {
  const { username, email, password } = await request.json();
  console.log("the user details are ", username, email, password);
  const compareUser = await User.findOne({ email: email });
  if (compareUser) {
    return NextResponse.json({
      message: "a user with this email already exist",
      status: 409,
      success: false,
    });
  }
  const user = new User({
    name: username,
    email: email,
    password: password,
  });
  //creating user instance in the database
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hashSync(user.password, salt);
    console.log("this is the user", user);
    const createdUser = await user.save();
    if (createdUser) {
      return NextResponse.json({
        message: "user craeated with credientils",
        createdUser,
        status: 201,
        success: true,
      });
    }
    ///
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "error creating user instance",
      status: 500,
      success: false,
    });
  }
}
