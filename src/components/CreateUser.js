"use client";
import { useState } from "react";
import Image from "next/image";
import { createUser } from "@/services/userServices";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const CreateUser = () =>
{
  const [ credentials, setCredentials ] = useState( {
    name: "",
    email: "",
    id: "",
    password: "",
  } );
  const [ file, setFile ] = useState( null );
  const [ filePreview, setFilePreview ] = useState( "/images/default.png" );

  // 1. Handle credential changes
  const handleChange = ( e ) =>
  {
    setCredentials( {
      ...credentials,
      [ e.target.name ]: e.target.value,
    } );
  };

  // 2. Handle file change and preview in the form
  const handleFileChange = ( e ) =>
  {
    const selectedFile = e.target.files[ 0 ];
    if ( selectedFile )
    {
      setFile( selectedFile );
      setFilePreview( URL.createObjectURL( selectedFile ) );
    }
  };

  const mutation = useMutation( {
    mutationFn: createUser,
    onSuccess: ( data ) =>
    {
      if ( data.success )
      {
        toast.success( data.message, {
          duration: 4000, // Disappear after 2 seconds
        } );
      }
      toast.error( data.message, {
        duration: 4000, // Disappear after 2 seconds
      } );
    },
    onError: ( error ) =>
    {
      // Error toast message
      toast.error( "Error occurred while creating user.", {
        duration: 2000, // Disappear after 2 seconds
      } );
      console.log( "The following error happened", error );
    },
  } );

  // Handle form submission
  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();
    const formData = new FormData();
    formData.append( "name", credentials.name );
    formData.append( "email", credentials.email );
    formData.append( "id", credentials.id );
    formData.append( "password", credentials.password );
    formData.append( "file", file );
    mutation.mutate( formData );
  };

  return (
    <div>
      <Toaster /> 
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <div className="card bg-base-100 w-2/5 shadow-xl">
          <div className="rounded-t-lg h-32 overflow-hidden">
            <Image
              className="object-cover object-top w-full"
              src="/images/pic2.jpg"
              alt="Mountain"
              width={ 800 }
              height={ 800 }
            />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <Image
              className="object-cover object-center h-32"
              src={ filePreview }
              alt="Selected image preview"
              width={ 150 }
              height={ 100 }
            />
          </div>
          <div className="text-center mt-4">
            <h1 className="flex m-4 font-extrabold leading-none tracking-tight justify-center text-gray-700 lg:text-3xl">
              Enter User Credentials
            </h1>
          </div>
          <ul className="py-4 text-gray-700 flex items-center justify-center">
            <form onSubmit={ handleSubmit }>
              <div className="flex flex-col my-4 h-6">
                <input
                  className="rounded-lg tracking-widest px-3 py-1 mt-0 text-white"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                  value={ credentials.name }
                  onChange={ handleChange }
                  required
                />
              </div>
              <div className="flex flex-col my-4 h-6">
                <input
                  className="rounded-lg tracking-widest px-3 py-1 mt-0 text-white"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={ credentials.email }
                  onChange={ handleChange }
                  required
                />
              </div>
              <div className="flex flex-col my-4 h-6">
                <input
                  className="rounded-lg tracking-widest px-3 py-1 mt-0 text-white"
                  type="number"
                  name="id"
                  id="id"
                  placeholder="ID"
                  value={ credentials.id }
                  onChange={ handleChange }
                  required
                />
              </div>
              <div className="flex flex-col my-4 h-6">
                <input
                  className="rounded-lg tracking-widest px-3 py-1 mt-0 text-white"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={ credentials.password }
                  onChange={ handleChange }
                  required
                />
              </div>
              <div className="flex flex-col m-4 h-6">
                <input
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  type="file"
                  accept="image/*"
                  onChange={ handleFileChange }
                  required
                />
              </div>
              <div className="py-4 flex mx-8 mt-4">
                <button
                  type="submit"
                  className="btn btn-outline btn-primary rounded-full mx-auto px-4"
                >
                  Create
                </button>
              </div>
            </form>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
