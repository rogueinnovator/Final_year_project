"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MetaMask from "../helper/MetaMask";
import detectEthereumProvider from "@metamask/detect-provider";
import { usePathname } from "next/navigation";
import { formateBalance } from "@/helper/formatedata";
import { useAppContext } from "@/context/myContext";
const Navbar = () => {
  const { user } = useAppContext();
  console.log(`this is the user email from navbar ${user?.email}`);

  const pathname = usePathname();
  const [hasProvider, setProvider] = useState("");
  const initialState = { accounts: [], balance: "", chainId: "" };
  const [wallet, setWallet] = useState(initialState);
  const [isConnecting, setConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const Metamask = window?.ethereum?.isMetaMask;
    const accountLength = wallet?.account?.length;
    const refreshAccounts = (accounts) => {
      accounts.length > 0 ? updateWallet(accounts) : setWallet(initialState);
    };
    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setProvider(Boolean(provider));
      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };
    getProvider();
    return () => {
      window.ethereum?.removeListener("accountChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const updateWallet = async (accounts) => {
    const balance = formateBalance(
      await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      }),
    );
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    console.log(
      `this is the balance ${balance} \n this is the chainId ${chainId} \n and this is the ${accounts[0]} \n`,
    );
    setWallet({ accounts, balance, chainId });
  };
  const handleConnect = async () => {
    setConnecting(true);
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        updateWallet(accounts);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      });
    setConnecting(false);
  };
  const disablConnect = Boolean(wallet) && isConnecting;

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
            MetaMask && wallet.accounts.length < 1
              ? "border-gray-300"
              : "cursor-not-allowed opacity-50 rounded-full"
          }`}
          onClick={() => {
            handleConnect();
          }}
          disabled={disablConnect}
        >
          {accountLength > 0 ? "Connected" : "Connect to Metamask"}
        </button>

        <div className="flex-none gap-2">
          {/* <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input rounded-full w-24 md:w-auto"
            />
          </div> */}
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
                  <div className="text-sm text-red-900">{user?.email}</div>
                </div>
              </li>
              <li>
                <div className="justify-between text-pretty">
                  address
                  <div className="text-sm text-red-900">
                    {wallet.account
                      ? `${wallet.account.substring(
                          0,
                          8,
                        )}...${wallet.account.substring(account.length - 4)}`
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
