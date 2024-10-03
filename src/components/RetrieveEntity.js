"use client";
import { useAppContext } from "@/context/myContext";
import { getContractInstance } from "@/helper/web3connection";
import Image from "next/image";
import { useState, useEffect } from "react";

const RetrieveEntity = () =>
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
        const requiredFields = { ...credentials };
        delete requiredFields.address;
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
                    <div className="py-4 text-white flex items-center justify-center ">
                        <table className="flex justify-center table mx-48">
                            <tbody className="">
                                <tr className="hover">
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                </tr>
                                <tr className="hover">
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
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
                                <tr className="hover">
                                    <td className="text-2xl ml-5">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                </tr>
                                <tr className="hover">
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                    <td className="text-2xl">
                                        name
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="py-4 flex mx-8 mt-4 justify-center">
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
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default RetrieveEntity;
