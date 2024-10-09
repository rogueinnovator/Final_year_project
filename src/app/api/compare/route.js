import { IncomingForm } from 'formidable';
import { spawn } from 'child_process';
import { NextResponse } from 'next/server';
import { match } from 'assert';
import path from "path";
import fs from "fs-extra";
// Disable body parser for the form data
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
const UPLOAD_DIR = path.resolve( process.env.ROOT_PATH || "", "public/uploaded" );
export async function POST ( request )
{
  const data = await request.formData();
  const body = Object.fromEntries( data );
  const file = body.image;
  if ( file )
  {
    const photoUrl = file.name;
    const buffer = Buffer.from( await file.arrayBuffer() );
    await fs.ensureDir( UPLOAD_DIR );
    const photoPath = path.resolve( UPLOAD_DIR, photoUrl );
    fs.writeFile( photoPath, buffer );
  }
  // Get the uploaded image path
  const uploadedImagePath = path.join( "../../../public/uploaded", file.name );
  console.log( uploadedImagePath );
  // Call the Python script using child_process
  const pythonProcess = spawn( 'python3', [ '../python/compare.py', uploadedImagePath ] );
  console.log( pythonProcess.stdout );
  pythonProcess.stdout.on( 'data', ( data ) =>
  {
    const result = data.toString().trim();

    // Send the result back to the client
    NextResponse.json( { status: 200, message: "Success ", result: result } );
  } );

  pythonProcess.stderr.on( 'data', ( data ) =>
  {
    NextResponse.json( { status: 500, message: `Error in python script error: ${ data.toString }` } );
  } );

}
