"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MetaMask from "../helper/MetaMask";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const initialState = { account: [], balance: "", chainId: "" };
  const [wallet, setWallet] = useState(initialState);
  const [disableConnect, setDisableConnect] = useState(false);
  const pathname = usePathname();
  const handleConnect = async () => {
    try {
      console.log("this is called");

      const [ethAccount, chainId, balance] = await MetaMask();
      setWallet({ account: [ethAccount], balance, chainId });
      console.log("this is pressed2");
      setDisableConnect(Boolean(ethAccount && balance && chainId));
      console.log(
        `this is eth account ${ethAccount}, this is balance ${balance}, this is chainId ${chainId}, this is disableConnect ${disableConnect}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (pathname === "/signin") {
    return null;
  } else {
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
              className={`btn btn-ghost ml-24 rounded-full font-mono text-2xl tracking-widest ${
                pathname === "/home" ? "underline" : ""
              }`}
            >
              Home
            </Link>
            <Link
              className={`btn btn-ghost ml-24 rounded-full  font-mono text-2xl tracking-widest ${
                pathname === "/about" ? "underline" : ""
              }`}
              href="/about"
            >
              About
            </Link>
            <Link
              className="btn btn-ghost ml-24 rounded-full font-mono text-2xl tracking-widest"
              href="/admin"
            >
              Admin
            </Link>
          </div>
        </div>

        <button
          className={`btn btn-outline rounded-full text-lg mr-10  ${
            disableConnect
              ? "cursor-not-allowed opacity-50 rounded-full"
              : "border-gray-300"
          }`}
          onClick={() => {
            handleConnect();
          }}
          disabled={disableConnect}
        >
          {wallet?.account.length > 0 ? "Connected" : "Connect to Metamask"}
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
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-14 rounded-full">
                <Image
                  alt="Tailwind CSS Navbar component"
                  src="/images/profile.jpg"
                  width={56}
                  height={56}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-72 p-2 shadow"
            >
              <li>
                <div className="justify-between text-sm">
                  Name
                  <div className="text-sm text-red-900">Huzaifa</div>
                </div>
              </li>
              <li>
                <div className="justify-between text-pretty">
                  address
                  <div className="text-sm text-red-900">l
                  
                    {wallet.account[0]
                      ? `${wallet.account[0].substring(
                          0,
                          8,
                        )}...${wallet?.account[0].substring(
                          wallet?.account[0].length - 4,
                        )}`
                      : "no accounts"}
                  </div>
                </div>
              </li>
              <li>
                <div className="justify-between text-sm">
                  Balance
                  <div className="text-sm text-red-900">{wallet.balance} </div>
                </div>
              </li>
              <li>
                <div className="justify-between text-sm">
                  {" "}
                  Chain ID{" "}
                  <div className="text-sm text-red-900">
                    {" "}
                    {wallet.chainId}
                  </div>{" "}
                </div>
              </li>
              <li className="justify-center">
                <Link className="justify-center" href="/signin">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
