import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";
connectDb();
export async function POST ( request )
{
  const { email, password } = await request.json();
  try
  {

    //1. Check if user with the given email exists
    const user = await User.findOne( { email: email } );

    if ( !user )
    {     console.log( password, email );

      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 401 },
      );
    }
    //2. Password match
    const matched = await bcrypt.compare( password, user.password );

    if ( !matched )
    {
      return NextResponse.json(
        {
          message: "Incorrect credentials",
          success: false,
        },
        { status: 401 },
      );
    }
    //3. Generate auth token (if password matches)
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }, // Include token expiry
    );

    //4. Send the user data
    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        success: true,
        user,
      },
      { status: 200 },
    );

    //5. Set the cookies with auth token
    response.cookies.set( "authToken", token, {
      maxAge: 24 * 60 * 60, // 1 day
      httpOnly: true,
      secure: false,
      sameSite: "lax", //lax is the type of cookies which is is send to another website only in case if toplevel navigation while the strick site cookies arent sent in case of crosssite script while the non are send in each case both in frame load and navigation
    } );
    return response;
  } catch ( error )
  {
    console.error( error );
    return NextResponse.json(
      {
        message: "Server error",
        success: false,
      },
      { status: 500 },
    );
  }
}
