"use client";
import { useAppContext } from "@/context/myContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { saveCriminalPic } from "@/services/criminalServices";
const CreateEntity = () =>
{
  const { web3, wallet, contractInstance } = useAppContext();
  const [ disable, setDisable ] = useState( true );
  const [ file, setFile ] = useState();
  const [ preview, setPreview ] = useState( "/images/default.png" );
  const account = wallet?.account[ 0 ];
  //credentials 
  const [ credentials, setCredentials ] = useState( {
    name: "",
    fatherName: "",
    cnic: "",
    location: "",
    gender: "",
    dob: "",
    id: "",
    crimeSeverity: "",
    offenseDescription: "",
    offenseCode: "",
    offenseDate: "",
    caseId: "",
    investigationOfficer: "",
    courtVerdict: "",
    id: "",
    crimeSeverity: "",
    offenseDescription: "",
    offenseCode: "",
    offenseDate: "",
    caseId: "",
    investigationOfficer: "",
    courtVerdict: "",
    prisonLocation: "",
    prisonId: "",
    tenure: "",
    prisonCode: "",
  } );
  const mutation = useMutation( {
    mutationFn: saveCriminalPic,
    onSuccess: ( data ) =>
    {
      console.log( "response", data );
    },
    onError: ( error ) =>
    {
      console.log( "following error happens", error );

    }
  } );
  useEffect( () =>
  {
    const requiredFields = { ...credentials };
    delete requiredFields.address;
    const requiredFieldsFilled = Object.values( requiredFields ).every(
      ( field ) => field !== ""
    );
    setDisable( !requiredFieldsFilled );
  }, [ credentials ] );
  //handle 1
  const handleChange = ( e ) =>
  {
    const { name, value } = e.target;//the previous state is a callback function passed which will provide the most updated value of the state
    setCredentials( ( prevState ) => ( {
      ...prevState,
      [ name ]: value// this syntax is know as computed property names and is used to  update the name with  a specific value dynamically 
    } ) );
  };
  //handle file change
  const handleFileChange = ( e ) =>
  {
    const selectedFile = e.target.files[ 0 ];
    if ( selectedFile )
    {
      setFile( selectedFile );
      setPreview( URL.createObjectURL( selectedFile ) );
    }
  };

  const createEntity = async ( e ) =>
  {
    e.preventDefault();

    if ( web3 )
    {
      try
      {
        const gasEstimation = await contractInstance.methods.createEntity( {
          name: credentials.name,
          fatherName: credentials.fatherName,
          cnic: credentials.cnic,
          location: credentials.location,
          gender: credentials.gender,
          dob: credentials.dob
        }, {
          id: credentials.id,
          crimeSeverity: credentials.crimeSeverity,
          offenseDescription: credentials.offenseDescription,
          offenseCode: credentials.offenseCode,
          offenseDate: credentials.offenseDate,
          caseId: credentials.caseId,
          investigationOfficer: credentials.investigationOfficer,
          courtVerdict: credentials.courtVerdict
        }, {
          prisonLocation: credentials.prisonLocation,
          prisonId: credentials.prisonId,
          tenure: credentials.tenure,
          prisonCode: credentials.prisonCode
        } ).estimateGas( { from: account } );
        console.log( "gas estimation :", gasEstimation );
        //send the data to the blockchain
        await contractInstance.methods.createEntity( {
          name: credentials.name,
          fatherName: credentials.fatherName,
          cnic: credentials.cnic,
          location: credentials.location,
          gender: credentials.gender,
          dob: credentials.dob
        }, {
          id: credentials.id,
          crimeSeverity: credentials.crimeSeverity,
          offenseDescription: credentials.offenseDescription,
          offenseCode: credentials.offenseCode,
          offenseDate: credentials.offenseDate,
          caseId: credentials.caseId,
          investigationOfficer: credentials.investigationOfficer,
          courtVerdict: credentials.courtVerdict
        }, {
          prisonLocation: credentials.prisonLocation,
          prisonId: credentials.prisonId,
          tenure: credentials.tenure,
          prisonCode: credentials.prisonCode
        } ).send( { from: account, gasEstimation } );
        console.log( "saving photo" );
        const formData = new FormData();
        formData.append( "cnic", credentials.cnic );
        formData.append( "file", file );
        mutation.mutate( formData );
        console.log( "photo saving called" );

      } catch ( error )
      {
        console.error( "these are the errors", error );
      }
    }
    else
    {
      console.log( "web3 not defined" );
    }
  };

  return (
    <div className="flex-auto justify-center px-5">
      <div className="card bg-base-100 w-full shadow-xl h-screen">
        <div className="rounded-xl h-32 overflow-hidden">
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
            src={ preview }
            alt="Woman looking front"
            width={ 150 }
            height={ 100 }
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-bold">{ credentials.name.toUpperCase() }</h2>
          <p className="text-gray-500">{ credentials.cnic }</p>
        </div>
        <button onClick={ createEntity }> submit</button>
        <form onSubmit={ createEntity }>
          <h1 className="flex mt-4 font-extrabold leading-none tracking-tight justify-center text-gray-700 lg:text-3xl">
            Personal information
          </h1>
          <div className="py-4 text-gray-700 flex items-center justify-between">
            <table className="table mx-3">
              <tbody>
                <tr>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="text"
                        name="name"
                        className="grow"
                        placeholder="Name"
                        value={ credentials.name }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="text"
                        name="fatherName"
                        className="grow"
                        placeholder="Father name"
                        value={ credentials.fatherName }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="number"
                        name="cnic"
                        className="grow"
                        placeholder="Cnic"
                        value={ credentials.cnic }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="text"
                        name="location"
                        className="grow"
                        placeholder="Address"
                        value={ credentials.location }
                        onChange={ handleChange }

                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <select
                        name="gender"
                        className="grow"
                        value={ credentials.gender }
                        onChange={ handleChange }
                        required
                      >
                        <option className="rounded-lg" value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>

                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="date"
                        name="dob"
                        className="grow"
                        placeholder="Date of birth"
                        value={ credentials.dob }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h1 className="flex mt-4 font-extrabold leading-none tracking-tight justify-center text-gray-700 lg:text-3xl">
            Criminal Record Information
          </h1>
          <div className="py-4 text-white flex items-center justify-between">
            <table className="table mx-3">
              <tbody>
                <tr>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="number"
                        name="id"
                        className="grow"
                        placeholder="Id"
                        value={ credentials.id }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="text"
                        name="crimeSeverity"
                        className="grow"
                        placeholder="Crime Severity"
                        value={ credentials.crimeSeverity }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="text"
                        name="offenseDescription"
                        className="grow"
                        placeholder="offenseDescription"
                        value={ credentials.offenseDescription }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="date"
                        name="offenseDate"
                        placeholder="Offense Date"
                        value={ credentials.offenseDate }
                        onChange={ handleChange }
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="number"
                        name="caseId"
                        className="grow"
                        placeholder="Case id"
                        value={ credentials.caseId }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="text"
                        name="investigationOfficer"
                        className="grow"
                        placeholder="Investigation officer"
                        value={ credentials.investigationOfficer }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="text"
                        name="courtVerdict"
                        className="grow"
                        placeholder="Court verdict"
                        value={ credentials.courtVerdict }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="number"
                        name="offenseCode"
                        className="grow"
                        placeholder="offenseCode"
                        value={ credentials.offenseCode }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="number"
                        name="prisonId"
                        className="grow"
                        placeholder="Prison id"
                        value={ credentials.prisonId }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="text"
                        name="prisonLocation"
                        className="grow"
                        placeholder="Prison location"
                        value={ credentials.prisonLocation }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="number"
                        name="tenure"
                        className="grow"
                        placeholder="Tenure"
                        value={ credentials.tenure }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2 text-white">
                      <input
                        type="number"
                        name="prisonCode"
                        className="grow"
                        placeholder="Prison Code"
                        value={ credentials.prisonCode }
                        onChange={ handleChange }
                        required
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="py-4 flex mx-8 mt-4 justify-center">
            <button
              type="submit"
              className="btn btn-outline btn-primary rounded-full mr-7"
              disabled={ disable }
            >
              { disable ? "Enter Details" : "Create" }
            </button>
            <input
              className="file-input file-input-bordered file-input-primary max-w-xs mr-8"
              type="file"
              accept="image/*"
              onChange={ handleFileChange }
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEntity;
