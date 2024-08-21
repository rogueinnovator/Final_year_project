import Web3 from "web3";

// Load environment variables
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const API_URL = process.env.API_URL;

// Load ABI from JSON file
const contractABIPromise = import(
  "../blockchain/build/contracts/CriminalDataSender.json"
).then((module) => module.abi);

let web3Instance;

// Function to initialize or retrieve the Web3 instance
export function getWeb3Instance() {
  if (!web3Instance) {
    web3Instance = new Web3(new Web3.providers.HttpProvider(API_URL));
  }
  return web3Instance;
}

// Function to get the contract instance
export async function getContractInstance() {
  const web3 = getWeb3Instance();
  const contractABI = await contractABIPromise;
  return new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
}
    