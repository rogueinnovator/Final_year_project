//get user related data using the user id
import { User } from "@/models/User";
import RenderResult from "next/dist/server/render-result";
import { NextResponse } from "next/server";
//.1 Get single user using the userId
export async function GET ( { params } )
{
  try
  {
    const { userId } = params;
    const user = await User.findById( userId );
    if ( !user )
    {
      return NextResponse.json( { success: false, message: "User not found " } );
    }
    return NextResponse.json( { data: user, success: true } );
  } catch ( error )
  {
    console.error( "error occured while retrieving the GetAllUsers:", error );
    return NextResponse.json( {
      success: false,
      message: "Error while retrieving the data ",
    } );
  }
}
// Delete a User using the userId
export async function DELETE ( req, { params } )
{

  try
  {
    const { userId } = params;
    const deletedUser = await User.findByIdAndDelete( userId );
    if ( !deletedUser )
    {
      return NextResponse.json( {
        success: false,
        message: "User not found",
      } );
    }

    return NextResponse.json( { success: true, message: "User deleted", userId: userId } );
  } catch ( error )
  {
    console.error( "Error while deleting the user:", error );
    return NextResponse.json( {
      success: false,
      message: "Error while deleting the user",
    } );
  }
}