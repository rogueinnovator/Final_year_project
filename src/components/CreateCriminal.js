"use client";
import { useAppContext } from "@/context/myContext";
import { getContractInstance } from "@/helper/web3connection";
import Image from "next/image";
import { useState, useEffect } from "react";

const CreateCriminal = () =>
{
  const { user, web3, wallet } = useAppContext();
  const [ disable, setDisable ] = useState( true );
  const [ credentials, setCredentials ] = useState( {
    name: "",
    email: "",
    fatherName: "",
    gender: "",
    dob: "",
    address: "",
    offenseDescription: "",
    offenseCode: "",
    offenseDate: "",
    caseId: "",
    investigationOfficer: "",
    courtVerdict: "",
    prisonId: "",
    prisonLocation: "",
  } );
  const [ preview, setPreview ] = useState( "/images/default.png" );
  const account = wallet?.account[ 0 ];

  useEffect( () =>
  {
    // Check if all required fields are filled to enable the button, excluding 'address'
    const requiredFields = { ...credentials };
    delete requiredFields.address; // Exclude address from the validation
    const requiredFieldsFilled = Object.values( requiredFields ).every(
      ( field ) => field !== ""
    );
    setDisable( !requiredFieldsFilled );
  }, [ credentials ] );
  const handleInputChange = ( e ) =>
  {
    const { name, value } = e.target;
    setCredentials( ( prevState ) => ( {
      ...prevState,
      [ name ]: value,
    } ) );
  };
  const handleFileChange = ( e ) =>
  {
    const selectedFile = e.target.files[ 0 ];
    if ( selectedFile )
    {
      setPreview( URL.createObjectURL( selectedFile ) );
    }
  };
  const addCriminals = async () =>
  {
    if ( web3 )
    {
      const contractInstance = getContractInstance();
      const rawData = await contractInstance.methods
        .getEntity( credentials.cnic )
        .call( { from: account } );
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

        <form onSubmit={ addCriminals }>
          <h1 className="flex mt-4 font-extrabold leading-none tracking-tight justify-center text-gray-700 lg:text-3xl">
            Personal information
          </h1>
          <div className="py-4 text-gray-700 flex items-center justify-between">
            <table className="table mx-3">
              <tbody>
                <tr>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="name"
                        className="grow"
                        placeholder="Name"
                        value={ credentials.name }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="email"
                        className="grow"
                        placeholder="Email"
                        value={ credentials.email }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="fatherName"
                        className="grow"
                        placeholder="Father name"
                        value={ credentials.fatherName }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="gender"
                        className="grow"
                        placeholder="Gender"
                        value={ credentials.gender }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="dob"
                        className="grow"
                        placeholder="Date of birth"
                        value={ credentials.dob }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="address"
                        className="grow"
                        placeholder="Address"
                        value={ credentials.address }
                        onChange={ handleInputChange }

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
          <div className="py-4 text-gray-700 flex items-center justify-between">
            <table className="table mx-3">
              <tbody>
                <tr>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="offenseDescription"
                        className="grow"
                        placeholder="Offense description"
                        value={ credentials.offenseDescription }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="offenseCode"
                        className="grow"
                        placeholder="Offense code"
                        value={ credentials.offenseCode }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="offenseDate"
                        className="grow"
                        placeholder="Date of offense"
                        value={ credentials.offenseDate }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="caseId"
                        className="grow"
                        placeholder="Case id"
                        value={ credentials.caseId }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="investigationOfficer"
                        className="grow"
                        placeholder="Investigation officer"
                        value={ credentials.investigationOfficer }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="courtVerdict"
                        className="grow"
                        placeholder="Court verdict"
                        value={ credentials.courtVerdict }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="prisonId"
                        className="grow"
                        placeholder="Prison id"
                        value={ credentials.prisonId }
                        onChange={ handleInputChange }
                        required
                      />
                    </label>
                  </td>
                  <td>
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        type="text"
                        name="prisonLocation"
                        className="grow"
                        placeholder="Prison location"
                        value={ credentials.prisonLocation }
                        onChange={ handleInputChange }
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
              disabled={ disable } // Button will be disabled if any required field is not filled.
            >
              { disable ? "Enter Details" : "Create" }
            </button>
            <input
              className="file-input file-input-bordered file-input-primary max-w-xs mr-8"
              type="file"
              accept="image/*"
              onChange={ handleFileChange } // Uncomment and implement this when adding image handling logic
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCriminal;
