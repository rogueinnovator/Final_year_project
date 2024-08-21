//make a dbconnection
const ADDRESS = process.env.ADDRESS;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESSI;
import { getContractInstance, getWeb3Instance } from "@/helper/web3connection";
import { estimateGas } from "web3/lib/commonjs/eth.exports";
const contractInstance = await getContractInstance();
const web3 = getWeb3Instance();
//get all the criminals
export async function GET() {
  try {
    const DAta = await contractInstance.methods
      .getAllCriminals()
      .call({ from: ADDRESS });
  } catch (error) {}
}
//1.Saving Criminal data to the block_chain
export async function POST(request) {
  const { name, id, cnic, sensitivity } = request.body;
  try {
    const contractInstance = await getContractInstance();
    const gasEstimate = await contractInstance.methods
      .CreateEntity(name, id, cnic, sensitivity)
      .estimateGas({ from: ADDRESS });
    const tx = {
      from: ADDRESS,
      to: CONTRACT_ADDRESS,
      gas: estimateGas,
      data: contractInstance.methods
        .CreateEntity(name, id, cnic, sensitivity)
        .encodeABI(),
    }.console.log(`Transaction Hash : ${tx.transactionHash}`);
    return NextResponse.json(
      {
        message: "Data Added successfully",
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(`error storing criminla info ${error}`);
    return NextResponse.json({ error: "Error storing data" }, { status: 500 });
  }
}
