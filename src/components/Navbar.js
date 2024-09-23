"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MetaMask from "../helper/MetaMask";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/myContext";
import { logOut } from "@/services/userServices";
const Navbar = () =>
{
  const router = new useRouter();
  const handleLogout = async () =>
  {
    await logOut();
    router.push( "/signIn" );
  };
  const { user, isAuthenticated, Admin } = useAppContext();
  console.log( "this is authentication", isAuthenticated );
  const initialState = { account: [], balance: "", chainId: "" };
  const [ wallet, setWallet ] = useState( initialState );
  const [ disableConnect, setDisableConnect ] = useState( false );
  const pathname = usePathname();
  const handleConnect = async () =>
  {
    try
    {
      const [ ethAccount, chainId, balance ] = await MetaMask();
      setWallet( { account: [ ethAccount ], balance, chainId } );
      console.log( "this is pressed2" );
      setDisableConnect( Boolean( ethAccount && balance && chainId ) );
      console.log(
        `this is eth account ${ ethAccount }, this is balance ${ balance }, this is chainId ${ chainId }, this is disableConnect ${ disableConnect }`,
      );
    } catch ( error )
    {
      console.error( error );
    }
  };

  if ( !isAuthenticated && pathname === "/signIn" )
  {
    return null;
  } else
  {
    return (
      <div className="navbar bg-transparent">
        <div className="flex-1">
          <div className="h-auto w-auto rounded-full">
            <Image
              className="ml-5"
              alt="logo"
              src="/images/pic4.png"
              width="70"
              height="70"
            />
          </div>
          <div className="flex justify-between">
            <Link
              href="/home"
              className={ `btn btn-ghost ml-24 rounded-full font-mono text-2xl tracking-widest ${ pathname === "/home" ? "underline" : ""
                }` }
            >
              Home
            </Link>
            <Link
              className={ `btn btn-ghost ml-24 rounded-full  font-mono text-2xl tracking-widest ${ pathname === "/about" ? "underline" : ""
                }` }
              href="/about"
            >
              About
            </Link>
            <Link
              className={ `btn btn-ghost ml-24 rounded-full  font-mono text-2xl tracking-widest ${ pathname === "/profile/admin" ? "underline" : ""
                }` }
              href="/profile/admin"
            >
              UserDetails
            </Link>
            <Link
              className={ `btn btn-ghost ml-24 rounded-full  font-mono text-2xl tracking-widest ${ pathname === "/createUser" ? "underline" : ""
                }` }
              href="/createUser"
            >
              Create User
            </Link>
          </div>
        </div>

        <button
          className={ `btn btn-outline rounded-full text-lg mr-10  ${ disableConnect
              ? "cursor-not-allowed opacity-50 rounded-full"
              : "border-gray-300"
            }` }
          onClick={ () =>
          {
            handleConnect();
          } }
          disabled={ disableConnect }
        >
          { ( wallet?.account.length > 0 ) & disableConnect
            ? "Connected"
            : "Connect to Metamask" }
        </button>

        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input rounded-full w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={ 0 }
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-14 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src={ user?.photoUrl }
                  width={ 56 }
                  height={ 56 }
                />
              </div>
            </div>
            <ul
              tabIndex={ 0 }
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-72 p-2 shadow"
            >
              <li>
                <div className="justify-between text-sm">
                  Name
                  <div className="font-bold text-blue-900">{ user?.name }</div>
                </div>
              </li>
              <li>
                <div className="justify-between text-sm">
                  email
                  <div className="text-sm text-blue-900">{ user?.email }</div>
                </div>
              </li>
              <li>
                <div className="justify-between text-pretty">
                  address
                  <div className="text-sm text-red-900">
                    { wallet.account[ 0 ]
                      ? `${ wallet.account[ 0 ].substring(
                        0,
                        8,
                      ) }...${ wallet?.account[ 0 ].substring(
                        wallet?.account[ 0 ].length - 4,
                      ) }`
                      : "Connect to MetaMask" }
                  </div>
                </div>
              </li>
              <li>
                <div className="justify-between text-sm">
                  Balance
                  <div className="text-sm text-red-900">{ wallet.balance } </div>
                </div>
              </li>
              <li>
                <div className="justify-between text-sm">
                  { "" }
                  Chain ID{ "" }
                  <div className="text-sm text-red-900">
                    { "" }
                    { wallet.chainId }
                  </div>
                  { "" }
                </div>
              </li>
              <li className="justify-center">
                <button className="justify-center" onClick={ handleLogout }>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
