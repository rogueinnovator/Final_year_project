import Web3 from "web3";
import { formateBalance, formateChainID } from "./formatedata";

export default async function MetaMask ()
{
  if ( typeof window !== "undefined" && typeof window.ethereum !== "undefined" )
  {
    try
    {
      const web3Instance = new Web3( window.ethereum );

      const accounts = await window.ethereum.request( {
        method: "eth_requestAccounts",
      } );

      if ( accounts.length > 0 )
      {
        const ethAccount = accounts[ 0 ];

        const balance = formateBalance(
          await web3Instance.eth.getBalance( ethAccount )
        );

        const chainId = formateChainID(
          await window.ethereum.request( {
            method: "eth_chainId",
          } )
        );

        return [ ethAccount, chainId, balance, web3Instance ];
      } else
      {
        console.log( "No accounts found." );
        return [ "No accounts found", null, null ];
      }
    } catch ( error )
    {
      console.error( "Error fetching accounts:", error.message );
      return [ "Error fetching accounts", null, null ];
    }
  } else
  {
    console.error( "MetaMask is not installed or not accessible." );
    return [ "MetaMask not available", null, null ];
  }
}
