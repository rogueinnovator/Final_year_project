import { NextResponse } from "next/server";
import { Criminal } from "@/models/CriminalData";
//2.Get criminal Data
export async function GET ( req, { params } )
{
  try
  {
    const { criminalCnic } = params;
    console.log( "this is cnic", criminalCnic );
    const data = await Criminal.findOne( {
      cnic: criminalCnic
    } );
    if ( data )
    {
      return NextResponse.json( data );
    }
    return NextResponse.json( { status: 404, message: "no data found" } );
  } catch ( error )
  {
    return NextResponse.json( { status: 500, message: "Server error" } );
  }
}


// //2.GET the criminal data using the criminalId from block_chain
// export async function GET(request) {
//   const searchParams = request.nextUrl.searchParams;
//   const CNIC = searchParams.get("CNIC");
//   const contractInstance = await getContractInstance();
//   try {
//     console.log(`getting info from the CNIC : ${CNIC}`);

//     const rawData = await contractInstance.methods
//       .getEntity(CNIC)
//       .call({ from: ADDRESS, to: CONTRACT_ADDRESS });
//     const Data = sanitizeData(rawData);
//     return NextResponse.json(
//       { Data },
//       {
//         status: 200,
//       },
//       {
//         success: true,
//       },
//       {
//         message: "data fetched successfully",
//       },
//     );
//   } catch (error) {
//     console.error(`error while retrieving the data \n ${error}`);
//     return NextResponse.json(
//       { status: 500 },
//       {
//         message: "error retrieving the data",
//       },
//     );
//   }
// }
// //.3 Delete the criminal using CNIC from the block_chain
// export async function DELETE(request) {
//   const contractInstance = await getContractInstance();
//   const searchParams = request.nextUrl.searchParams;
//   const CNIC = searchParams.get("CNIC");
//   console.log("this is cnic", CNIC);
//   try {
//     console.log(contractInstance);
//     const result = await contractInstance.methods
//       .deleteEntity(CNIC)
//       .send({ from: ADDRESS, gas: 6721975 });
//     return NextResponse.json(
//       {
//         message: "entity deleted",
//       },
//       {
//         success: true,
//       },
//       {
//         result,
//       },
//       {
//         status: 200,
//       },
//     );
//   } catch (error) {
//     console.error(`error while deleting the data ${error}`);
//     return NextResponse.json(
//       {
//         message: "error while deleting entity",
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }
