
import { spawn } from 'child_process';
import { NextResponse } from 'next/server';
import path from "path";
import fs from "fs-extra";

const UPLOAD_DIR = path.resolve( process.env.ROOT_PATH || "", "public/tempPics" );

export async function POST ( request )
{
  const data = await request.formData();
  const body = Object.fromEntries( data );
  const file = body.image;

  try
  {
    if ( file )
    {
      const photoUrl = file.name;
      const buffer = Buffer.from( await file.arrayBuffer() );
      await fs.ensureDir( UPLOAD_DIR );
      const photoPath = path.resolve( UPLOAD_DIR, photoUrl );
      await fs.writeFile( photoPath, buffer );
    }

    const uploadedImagePath = path.join( UPLOAD_DIR, file.name );

    // Wrap the python process in a promise
    const result = await new Promise( ( resolve, reject ) =>
    {
      const pythonProcess = spawn( 'bash', [ '-c', `source ~/Desktop/Final_year_project/src/env/bin/activate && python3 ~/Desktop/Final_year_project/src/app/api/python/compare.py ${ uploadedImagePath }` ] );

      pythonProcess.stdout.on( 'data', ( data ) =>
      {
        const result = data.toString().trim();
        resolve( result );
      } );

      pythonProcess.stderr.on( 'data', ( data ) =>
      {
        const error = data.toString().trim();
        reject( new Error( `Error in Python script: ${ error }` ) );
      } );

      pythonProcess.on( 'error', ( error ) =>
      {
        reject( new Error( `Failed to start process: ${ error.message }` ) );
      } );
    } );
    if ( result === "No match found." )
    {
      return NextResponse.json( { status: 404, result } );

    }
    return NextResponse.json( { status: 200, message: "Success", result } );

  } catch ( error )
  {
    console.error( "Error occurred:", error );
    return NextResponse.json( {
      message: "Error during image comparison",
      status: 500,
      success: false,
      error: error.message
    } );
  }
}
