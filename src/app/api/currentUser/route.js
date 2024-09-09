import { connectDb } from "@/helper/db";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
connectDb();
export async function GET ( request ) {
    try
    {
        const AUTH_TOKEN = request.cookies.get( "authToken" )?.value;
        const id = jwt.verify( AUTH_TOKEN, process.env.SECRET_KEY ).id;
        const user = await User.findById( id );
        return NextResponse.json( user );
    } catch ( error )
    {
        console.error( error );
    }


}