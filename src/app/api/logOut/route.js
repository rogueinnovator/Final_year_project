import { NextResponse } from "next/server";

export async function POST () {
    try
    {
        const response = NextResponse.json( {
            message: "Log out Success !",
            success: "true"
        } );
        response.cookies.delete( "authToken" );
        return response;
    } catch ( error )
    {
        return NextResponse.json( {
            error: error.message
        }, { status: 500 } );
    }
}