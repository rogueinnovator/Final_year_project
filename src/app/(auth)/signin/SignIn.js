"use client";
import { signIn } from "@/services/userServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SignIn = () => {
  const router = new useRouter();
  const [credentials, setCredentials] = useState("");
  const [emailError, setEmailError] = useState("");

  //1.handle the data submission
  const handlesignIn = (event) => {
    event.preventDefault();
    console.log("signin clicked");
    try {
      const result = signIn(credentials);
      if (result.success) {
        console.log("logged in success");
        setUser(result.user);
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //2.handle the change in the form field and set the credentials accordingly
  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("enter valid email");
      } else setEmailError("");
    }
  };
  return (
    <div className="px-6 py-2 rounded-xl border w-80 saturate-150">
      <div className="flex flex-col items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <h2 className="text-2xl font-bold">Login</h2>
      </div>
      {/*              FORM *          /}

      {/*1. EMAIL */}
      <form onSubmit={handlesignIn}>
        <div className="flex flex-col my-1">
          {emailError && (
            <label htmlFor="email" className="my-2 mx-3 text-red-600">
              {" "}
              {emailError}
            </label>
          )}
          <input
            className="rounded-lg tracking-widest px-3 py-1 mt-0 text-black"
            value={credentials.email}
            onChange={onChange}
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
        </div>
        {/* 2.PASSWORD */}
        <div className="flex flex-col my-1">
          <input
            className=" tracking-widest rounded-lg px-3 py-1 mt-3 text-black"
            type="password"
            value={credentials.password}
            onChange={onChange}
            id="password"
            name="password"
            placeholder="password"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-3">
          <button
            className={` my-2 py-1 w-full rounded-2xl ${
              emailError || credentials === "" ? "bg-red-500" : "bg-blue-700"
            } text-white `}
            type="submit"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            disabled={emailError || credentials === ""}
          >
            {emailError || credentials === "" ? "Enter Credentials" : "Submit"}
          </button>
          <Link
            className="my-2 py-1 w-full rounded-2xl text-white bg-black px-28"
            href="signup"
          >
            Signup
            <span className="ml-3 text-lg">→</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
