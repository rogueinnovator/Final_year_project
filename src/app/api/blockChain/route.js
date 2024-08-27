import sanitizeData from "@/helper/sanitizeData";
import { getContractInstance, getWeb3Instance } from "@/helper/web3connection";
import { NextResponse } from "next/server";
const ADDRESS = process.env.ADDRESS;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contractInstance = await getContractInstance();
//1.get all the criminals
export async function GET() {
  try {
    const gasEstimation = await contractInstance.methods
      .getAllCriminals()
      .estimateGas({ from: ADDRESS });
    const result = await contractInstance.methods.getAllCriminals().call();
    // const result = await contractInstance.methods
    //   .getAllCriminals()
    //   .call({ from: ADDRESS ,gasEstimation:67219751212312});
    const Data = sanitizeData(result);
    console.log(
      `Data of all the criminals is :${Data} this is non_sanatized data ${result}`,
    );
    return NextResponse.json(
      { Data },

      {
        status: 200,
      },
      {
        success: true,
      },
      {
        messsage: "Data fetched successfully",
      },
    );
  } catch (error) {
    console.error("Error while retrieving the data:", error);

    // Return error response as JSON
    return NextResponse.json(
      {
        success: false,
        message: "Error while retrieving the data",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

//2.Saving Criminal data to the block_chain
export async function POST(request) {
  console.log("called b");
  // const contractInstance = await getContractInstance();

  const { name, id, cnic, sensitivity } = await request.json();
  try {
    const gasEstimation = await contractInstance.methods
      .CreateEntity(name, id, cnic, sensitivity)
      .estimateGas({ from: ADDRESS });
    const tx = await contractInstance.methods
      .CreateEntity(name, id, cnic, sensitivity)
      .send({ from: ADDRESS, gas: gasEstimation, gasPrice: 20000000000 });
    console.log(`Transaction Hash : ${tx.transactionHash}`);
    const TH = tx.transactionHash;
    return NextResponse.json(
      {
        message: "Data Added successfully",
        success: true,
      },
      { TH },
      { status: 200 },
    );
  } catch (error) {
    console.error(`error storing criminalI info ${error}`);
    return NextResponse.json({ error: "Error storing data" }, { status: 500 });
  }
}
