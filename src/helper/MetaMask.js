import { formateBalance, formateChainID } from "./formatedata";

export default async function MetaMask() {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      console.log("the metamask is called ");

      // Request accounts from MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        const ethAccount = accounts[0];
        // Request balance from MetaMask
        const balance = formateBalance(
          await window.ethereum.request({
            method: "eth_getBalance",
            params: [ethAccount, "latest"],
          }),
        );
        // const balance = formateBalance(rawBalance);
        // Request chainId from MetaMask
        const chainId = formateChainID(
          await window.ethereum.request({
            method: "eth_chainId",
          }),
        );

        // const chainId = formateChainID(rawChainId);

        return [ethAccount, chainId, balance];
      } else {
        console.log("No accounts found.");
        return ["No accounts found", null, null];
      }
    } catch (error) {
      console.error("Error fetching accounts:", error.message);
      return ["Error fetching accounts", null, null];
    }
  } else {
    console.error("MetaMask is not installed or not accessible.");
    return ["MetaMask not available", null, null];
  }
}
