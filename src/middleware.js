import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware ( request )
{
  const AUTH_TOKEN = request.cookies.get( "authToken" )?.value;
  const { pathname } = request.nextUrl;
  if ( pathname === "/signIn" || pathname === "/signUp" )
  {
    return NextResponse.next();
  }

  if ( AUTH_TOKEN )
  {
    try
    {
      const SECRET = new TextEncoder().encode( process.env.SECRET_KEY );
      await jwtVerify( AUTH_TOKEN, SECRET );
      return NextResponse.next();
    } catch ( error )
    {
      console.error( "JWT verification failed:", error );
    }
  }
  else
  {
    return NextResponse.redirect( new URL( "/signIn", request.url ) );

  }
  // If not authenticated, redirect to signIn page for protected routes
  if ( pathname.startsWith( "/api" ) )
  {
    console.log( "path name starts with api", pathname );
    return NextResponse.redirect( new URL( "/404", request.url ) );
  }

  return NextResponse.redirect( new URL( "/signIn", request.url ) );
}

export const config = {
  matcher: [
    "/",
    "/signIn",
    "/signUp",
    "/home",
    "/api:path",
    "/show-tasks",
  ],
};
