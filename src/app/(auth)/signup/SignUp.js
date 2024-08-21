"use client";
import Link from "next/link";
const SignUp = () => {
  return (
    <div className="px-6 py-3 rounded-2xl border w-80">
      <div className="flex flex-col items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <h2 className="text-2xl font-bold">SignUp</h2>
      </div>
      <form>
        <div className="flex flex-col my-1">
          {/* <label className="text-xs tracking-widest text-white ">
            {" "}
            username
          </label> */}
          <input
            className="rounded-lg tracking-widest px-3 py-1 mt-1 text-black"
            type="text"
            placeholder="username"
          />
        </div>
        <div className="flex flex-col my-1">
          {/* <label className="text-xs tracking-widest text-white "> email</label> */}
          <input
            className="rounded-lg tracking-widest px-3 py-1 mt-3 text-black"
            type="text"
            placeholder="email"
          />
        </div>
        <div className="flex flex-col my-1">
          {/* <label className="text-xs text-white tracking-widest">password</label> */}
          <input
            className=" tracking-widest rounded-lg px-3 py-1 mt-3 text-black"
            type="password"
            placeholder="password"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-2">
          <button className="my-2 py-1 w-full rounded-2xl bg-blue-600 text-white">
            Submit{" "}
          </button>
          <Link
            className="my-2 py-1 w-full rounded-2xl text-white bg-black px-28"
            href="signin"
          >
            LogIn
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
