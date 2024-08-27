import { NextResponse } from "next/server";
import { getWeb3Instance, getContractInstance } from "@/helper/web3connection";
import sanitizeData from "@/helper/sanitizeData";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ADDRESS = process.env.ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
//2.GET the criminal data usig the criminalId from block_chain
export async function GET(request, { params }) {
  const { criminalId } = params;
  const web3 = getWeb3Instance();
  const contractInstance = getContractInstance();
  try {
    console.log(`getting info from the id : ${criminalId}`);
    const data = await contractInstance.methods
      .getEntity(criminalId)
      .encodeABI();
    const gas = await web3.eth.estimateGas({
      from: ADDRESS,
      to: CONTRACT_ADDRESS,
      data: data,
    });
    const gasPrice = await web3.eth.getGasPrice();
    const tx = {
      from: ADDRESS,
      to: CONTRACT_ADDRESS,
      gas: gas,
      gasPrice: gasPrice,
      data: data,
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    console.log(`RECEIPT : ${receipt} \n`);
    const RawData = await contractInstance.methods
      .getEntity(criminalId)
      .call({ from: ADDRESS });
    const Data = sanitizeData(RawData);
    return NextResponse.json(
      { Data },
      {
        receipt,
      },
      {
        status: 200,
      },
      {
        success: true,
      },
      {
        messsage: "data fetched successfully",
      },
    );
  } catch (error) {
    console.error(`error while retrieving the data \n ${error}`);
    return NextResponse.json(
      { status: 500 },
      {
        message: "error retrieving the data",
      },
    );
  }
}
//.3 Delete the criminal using CNIC from the block_chain
export async function DELETE() {
  const { CNIC } = params;
  const web3 = getWeb3Instance();
  const contractInstance = getContractInstance();
  try {
    const data = contractInstance.methods.deleteEntity(CNIC).encodeABI();
    const gas = await web3.eth.estimateGas({
      from: ADDRESS,
      to: CONTRACT_ADDRESS,
      data: data,
    });
    const gasPrice = await web3.eth.getGasPrice();
    const tx = {
      from: ADDRESS,
      to: CONTRACT_ADDRESS,
      gas: gas,
      gasPrice: gasPrice,
      data: data,
    };
    const signedtx = await web3.eth.signTransaction(tx, PRIVATE_KEY);
    const receipt = await web3.sendSignedTransaction(signedtx.rawTransaction);

    return NextResponse.json(
      {
        message: "entity deleted",
      },
      {
        success: true,
      },
      {
        receipt,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(`erorr while deleting the data ${error}`);
    return NextResponse.json(
      {
        message: "error while deleting entity",
      },
      {
        status: 500,
      },
    );
  }
}
