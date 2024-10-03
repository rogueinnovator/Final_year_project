import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/helper/db";
import path from "path";
import fs from "fs-extra";
import { renameFile } from "@/helper/renameFile";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH || "", "public/uploads");

connectDb();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    const { name, email, id, password } = body;

    const file = body.file || null;
    console.log(
      "this is file",
      file,
      "and these are the details",
      name,
      email,
      id,
      password,
    );
    const photoUrl = renameFile(file.name, id);
    console.log(`this is photoUrl ${photoUrl}`);
    const compareUser = await User.findOne({ email });
    if (compareUser) {
      return NextResponse.json({
        message: "A user with this email already exists",
        status: 409,
        success: false,
      });
    }
    const user = new User({
      name,
      email,
      id,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hashSync(user.password, salt);

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.ensureDir(UPLOAD_DIR);
      const photoPath = path.resolve(UPLOAD_DIR, photoUrl);
      await fs.writeFile(photoPath, buffer);
      user.photoUrl = path.join("/uploads", photoUrl);
    }

    // Save the user instance in the database
    const createdUser = await user.save();
    if (createdUser) {
      return NextResponse.json({
        message: "User created successfully with credentials",
        createdUser,
        status: 201,
        success: true,
      });
    }
  } catch (error) {
    console.error("console error in cache", error);
    return NextResponse.json({
      message: "Error creating user instance",
      status: 500,
      success: false,
    });
  }
}
