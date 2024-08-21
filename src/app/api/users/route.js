import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/helper/db";
connectDb(); //fucntion to connect to database

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

//2.create a User
export async function POST(request) {
  const { name, email, password } = await request.json();
  console.log("the user details are ", name, email.password);
  const compareUser = await User.findOne({ email: email });
  if (compareUser) {
    return NextResponse.json({
      message: "a user with this email already exist",
      status: 409,
      success: false,
    });
  }
  const user = new User({
    name: name,
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
