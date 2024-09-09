"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/userServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const router = new useRouter();
  const [credentials, setCredentials] = useState( {
    username: "",
    email: "",
    password: "",
  } );

  const mutation = useMutation( {
    mutationFn: signUp,
    onSuccess: ( data ) => {
      console.log( `User signed up successfully` );
      router.push( "/signIn" );
    },
    onError: ( error ) => {
      console.error( `Error signing up: ${ error.message }` );
    },
  } );

  const handleSignup = ( event ) => {
    event.preventDefault();
    mutation.mutate( credentials );
  };

  const onChange = ( event ) => {
    const { name, value } = event.target;
    setCredentials( { ...credentials, [name]: value } );
  };

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
      <form onSubmit={ handleSignup }>
        <div className="flex flex-col my-1">
          <input
            className="rounded-lg tracking-widest px-3 py-1 mt-0 text-white"
            type="text"
            onChange={ onChange }
            value={ credentials.username }
            id="username"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col my-1">
          <input
            className="rounded-lg tracking-widest px-3 py-1 mt-0 text-white"
            type="email"
            onChange={ onChange }
            value={ credentials.email }
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col my-1">
          <input
            className="rounded-lg tracking-widest px-3 py-1 mt-0 text-white"
            type="password"
            value={ credentials.password }
            onChange={ onChange }
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col items-center justify-center my-2">
          <button
            className="my-2 py-1 w-full rounded-2xl bg-blue-600 text-white"
            type="submit"
            disabled={ mutation.isLoading }
          >
            { mutation.isLoading ? "Signing Up..." : "Submit" }
          </button>
          { mutation.isError && (
            <div className="toast toast-end toast-middle">
              <div className="alert alert-info">
                Error: { mutation.error.message }
              </div>
            </div>
          ) }
          { mutation.isSuccess && (
            <div className="toast toast-end toast-middle">
              <div className="alert alert-success">SignUp successful!</div>
            </div>
          ) }
          <Link
            className="my-2 py-1 w-full rounded-2xl text-white bg-black px-28"
            href="/signIn"
          >
            LogIn
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
