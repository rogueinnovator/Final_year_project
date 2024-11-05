import { connectDb } from "@/helper/db";
import { Criminal } from "@/models/CriminalData";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs-extra";
import { renameFile } from "@/helper/renameFile";
const UPLOAD_DIR = path.resolve( process.env.ROOT_PATH || "", "public/criminalImages" );
//1.Save criminal pictureData
export async function POST ( request )
{
  const formData = await request.formData();
  const body = Object.fromEntries( formData );
  const { cnic } = body;
  const photo = body.file || null;
  console.log( "this is cnic and photo", cnic, photo );
  const photoUrl = renameFile( photo.name, cnic );

  const criminal = new Criminal( {
    cnic,
  } );

  if ( photo )
  {
    const buffer = Buffer.from( await photo.arrayBuffer() );
    await fs.ensureDir( UPLOAD_DIR );
    const photoPath = path.resolve( UPLOAD_DIR, photoUrl );
    await fs.writeFile( photoPath, buffer );
    criminal.photoUrl = path.join( "/criminalImages", photoUrl );
  }
  // save the criminal data 
  const CreatedCriminal = await criminal.save();
  if ( CreatedCriminal )
  {
    return NextResponse.json( { status: 200, message: "criminal details saved" } );
  }
}



// //1.get all the criminals
// export async function GET() {
//   try {
//     const contractInstance = await getContractInstance();
//     const result = await contractInstance.methods
//       .getAllCriminals()
//       .call({ from: ADDRESS });
//     const Data = sanitizeData(result);
//     return NextResponse.json(
//       {
//         message: "Data fetched successfully",
//         Data,
//       },
//       {
//         success: true,
//       },
//       {
//         status: 200,
//       },
//     );
//   } catch (error) {
//     console.error("Error while retrieving the data:", error);

//     return NextResponse.json(
//       {
//         error: error.message,
//       },
//       {
//         message: "Error while retrieving the data",
//       },
//       { status: 500 },
//       {
//         success: false,
//       },
//     );
//   }
// }

// //2.Saving Criminal data to the block_chain
// export async function POST(request) {
//   console.log("called b");
//   const contractInstance = await getContractInstance();
//   const { name, id, cnic, sensitivity } = await request.json();
//   try {
//     //estimateGas() simulates the execution of the transaction using the current state of the blockchain. It performs the computation necessary to determine how much gas the transaction will likely need.
//     const gasEstimation = await contractInstance.methods
//       .createEntity(name, id, cnic, sensitivity)
//       .estimateGas({ from: ADDRESS });
//     const result = await contractInstance.methods
//       .createEntity(name, id, cnic, sensitivity)
//       .send({ from: ADDRESS, gas: gasEstimation });
//     console.log(result);
//     return NextResponse.json(
//       {
//         message: "Data Added successfully",
//         success: true,
//       },
//       { result },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error(`error while storing criminal info : ${error}`);
//     return NextResponse.json({ error: "Error storing data" }, { status: 500 });
//   }
// }
