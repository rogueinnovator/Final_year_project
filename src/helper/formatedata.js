// Function  to formate the balance
export const formateBalance = (rawBalance) => {
  // Convert the raw balance (which is in hexadecimal) to a BigInt
  const balanceBigInt = BigInt(rawBalance);

  // Convert the balance from wei to ether (1 ether = 10^18 wei)
  const balance = (balanceBigInt / 1000000000000000000n).toString();

  return balance;
};
// Function to formate the chainId

export const formateChainID = (chainIdHex) => {
  // Convert the hex chain ID to a number
  const chainIdNum = parseInt(chainIdHex, 16);
  return chainIdNum;
};
