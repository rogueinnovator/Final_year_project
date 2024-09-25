"use client";
import { currentUser } from "@/services/userServices";
import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contractABIPromise = import( "../blockchain/build/contracts/CriminalDataSender.json" ).then( module => module.abi );

const ContextProvider = ( { children } ) =>
{
  const [ user, setUser ] = useState( null );
  const [ isAuthenticated, setIsAuthenticated ] = useState( false );
  const [ Admin, setAdmin ] = useState( false );
  const [ web3, setWeb3 ] = useState( null );
  const initialState = { account: [], balance: "", chainId: "" };
  const [ contractInstance, setContractInstance ] = useState();
  const [ wallet, setWallet ] = useState( initialState );

  async function getUser ()
  {
    const { data, success } = await currentUser();
    if ( success )
    {
      setUser( data );
      setIsAuthenticated( true );
      if ( data.isAdmin )
      {
        setAdmin( true );
      }
    }
  }

  useEffect( () =>
  {
    getUser();
  }, [] );

  useEffect( () =>
  {
    const setUpContractInstance = async () =>
    {
      if ( web3 )
      {
        const contractABI = await contractABIPromise;
        const instance = new web3.eth.Contract( contractABI, CONTRACT_ADDRESS );
        setContractInstance( instance );
      }
    };

    setUpContractInstance();
  }, [ web3 ] );
  console.log( "contract instance", contractInstance, "web 3 ", web3 );

  return (
    <AppContext.Provider
      value={ {
        user,
        setUser,
        isAuthenticated,
        Admin,
        setWeb3,
        setWallet,
        wallet,
        contractInstance,
      } }
    >
      { children }
    </AppContext.Provider>
  );
};

const useAppContext = () =>
{
  return useContext( AppContext );
};

export { ContextProvider, useAppContext };
