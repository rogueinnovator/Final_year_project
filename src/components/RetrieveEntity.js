"use client";
import { useAppContext } from "@/context/myContext";
import Image from "next/image";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { CriminalPhoto, faceCompare } from "@/services/criminalServices";
import sanitizeData from "@/helper/sanitizeData";

const RetrieveEntity = () =>
{
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
    const { web3, wallet, contractInstance } = useAppContext();
    const [ preview, setPreview ] = useState( "/images/default.png" );
    const [ showWebcam, setWebCam ] = useState( false );
    const [ cnic, setCnic ] = useState( "" );
    const formData = new FormData();
    const webcamRef = useRef( null );
    const [ imgSrc, setImgSrc ] = useState( null );
    const [ loading, setLoading ] = useState( false );
    const account = wallet?.account[ 0 ];

    const LoadingComponent = () => (
        <div className="loading">
            <p>Comparing face, please wait...</p>
        </div>
    );

    const resetCredentials = () =>
    {
        setCredentials( {
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
            prisonLocation: "",
            prisonId: "",
            tenure: "",
            prisonCode: "",
        } );
    };

    //1. Function to retake the picture
    const retake = () =>
    {
        setImgSrc( null );
    };

    //2. Function to capture the picture
    const capture = useCallback( () =>
    {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc( imageSrc );
    }, [ webcamRef ] );

    //3.Function to Send the face data for comparison
    const sendData = async () =>
    {
        try
        {
            setLoading( true );
            const blob = await ( await fetch( imgSrc ) ).blob();
            formData.append( "image", new File( [ blob ], "uploaded_image.jpg" ) );
            const response = await faceCompare( formData );
            const cnic = response.result.replace( /\.[0-9a-z]+$/i, '' );
            await getCriminal( cnic );
        } finally
        {
            setLoading( false );
        }
    };

    //4.Function to Show and hide the camera
    const webCamSet = ( data ) =>
    {
        setWebCam( data );
    };

    //5.Function to set the value of CNIC
    const handleChange = ( e ) =>
    {
        const { value } = e.target;
        setCnic( value );
    };

    const retrieveByCnic = async () =>
    {
        await getCriminal( cnic );
    };

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
        prisonLocation: "",
        prisonId: "",
        tenure: "",
        prisonCode: "",
    } );

    const getCriminal = async ( CNIC ) =>
    {
        if ( web3 )
        {
            const rawData = await contractInstance.methods.getEntity( CNIC ).call( { from: account, to: CONTRACT_ADDRESS } );
            const data = sanitizeData( rawData );
            setCredentials( {
                name: data.personal.name || "",
                fatherName: data.personal.fatherName || "",
                cnic: data.personal.cnic || "",
                location: data.personal.location || "",
                gender: data.personal.gender || "",
                dob: data.personal.dob || "",
                id: data.crime.id || "",
                crimeSeverity: data.crime.crimeSeverity || "",
                offenseDescription: data.crime.offenseDescription || "",
                offenseCode: data.crime.offenseCode || "",
                offenseDate: data.crime.offenseDate || "",
                caseId: data.crime.caseId || "",
                investigationOfficer: data.crime.investigationOfficer || "",
                courtVerdict: data.crime.courtVerdict || "",
                prisonLocation: data.prison.prisonLocation || "",
                prisonId: data.prison.prisonId || "",
                tenure: data.prison.tenure || "",
                prisonCode: data.prison.prisonCode || "",
            } );
            const photoData = await CriminalPhoto( data.personal.cnic );
            setPreview( photoData.photoUrl );
        } else
        {
            console.log( "Please connect to metamask" );
        }
    };

    return (

        <div className="flex-auto justify-center px-5">
            { !credentials.name ? ( <div>  { loading ? ( <div className="flex justify-center items-center mt-96">
                <div className="text-2xl text-white">Retrieving  </div>
                <span className="loading loading-bars loading-lg ml-3"></span>

            </div> ) : ( <div className="flex justify-center ">
                <div className="card bg-base-100 w-auto shadow-xl">
                    <div className="card-body">
                        <div className="flex  justify-center">
                            <input type="number" placeholder="ENTER CNIC" name="cnic" value={ cnic } onChange={ handleChange } className="input input-bordered w-full max-w-xs rounded-full mx-3" />
                            <button className="btn btn-primary mx-3 rounded-full" onClick={ retrieveByCnic }>RetrieveCriminalData</button>
                            { showWebcam ? ( <button className="btn btn-primary mx-3 rounded-full" onClick={ () => { webCamSet( false ); } }>Hide webcam</button>
                            ) : ( <button className="btn btn-primary mx-3 rounded-full" onClick={ () => { webCamSet( true ); } }>Show webcam</button>
                            ) }
                        </div>
                    </div>
                    { showWebcam && ( <div className="container">
                        { imgSrc ? (
                            <Image src={ imgSrc } alt="webcam" width={ 800 } height={ 800 } />
                        ) : (
                            <Webcam height={ 800 } width={ 800 } ref={ webcamRef } />
                        ) }
                        <div className="flex justify-center ">
                            { imgSrc ? (
                                <>
                                    <button className="btn btn-warning m-3 rounded-full" onClick={ retake }>ReScan</button>
                                    <button className="btn btn-primary m-3 rounded-full" onClick={ sendData }>Retrieve</button>
                                </>
                            ) : (
                                <button className="btn btn-secondary m-3" onClick={ capture }>Scan</button>
                            ) }

                        </div>
                    </div> ) }

                </div>
            </div> ) } </div> ) : ( <div className="card bg-base-100 w-full shadow-xl h-screen">
                <div className="rounded-xl h-32 overflow-hidden">
                    <Image
                        className="object-cover object-top w-full"
                        src="/images/pic2.jpg"
                        alt="Mountain"
                        width={ 800 }
                        height={ 800 }
                    />
                </div>
                <div className="mx-auto w-32 h-36 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <Image
                        className="object-cover object-center h-28 "
                        src={ preview }
                        alt="Profile image"
                        width={ 150 }
                        height={ 100 }
                    />
                </div>
                <div className="text-center mt-2">
                    {/* <h2 className="font-bold">{ credentials.name.toUpperCase() }</h2> */ }
                    <button className="btn rounded-full m-2" onClick={ resetCredentials }>Retrieve Another</button>
                </div>
                <form onSubmit={ getCriminal }>
                    <div className="bg-transparent overflow-hidden shadow rounded-lg border">

                        <div className="px-4 py-5 sm:px-6">
                            <h1 className="text-center mt-4 font-extrabold leading-none tracking-tight text-white lg:text-3xl">
                                Personal information
                            </h1>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">name</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">{ credentials.name }</dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">FatherName</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">
                                        { credentials.fatherName }
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">Cnic</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">{ credentials.cnic }</dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">Address</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">
                                        { credentials.location }
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">Gender</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">
                                        { credentials.gender }
                                    </dd>
                                </div>
                            </dl>
                        </div>

                    </div>
                    <div className="bg-gray-800 overflow-hidden shadow rounded-lg border">
                        <div className="px-4 py-5 sm:px-6">
                            <h1 className="text-center mt-4 font-extrabold leading-none tracking-tight text-white lg:text-3xl">
                                Crime Details
                            </h1>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">Id</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">{ credentials.id }</dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">crimeSeverity</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">
                                        { credentials.crimeSeverity }</dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">offenseDescription</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">{ credentials.offenseDescription }</dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">offenseDate</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">
                                        { credentials.offenseCode }
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">caseId</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">{ credentials.caseId }</dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">investigationOfficer</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">
                                        { credentials.investigationOfficer }
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">courtVerdict</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">{ credentials.courtVerdict }</dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">offenseCode</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">
                                        { credentials.offenseCode }
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">prisonId</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">
                                        { credentials.prisonId }
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">prisonLocation</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">{ credentials.prisonLocation }</dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">tenure</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">
                                        { credentials.tenure }      </dd>
                                </div>
                                <div className="py-3 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 text-center">
                                    <dt className="text-lg font-medium text-white">prisonCode</dt>
                                    <dd className="mt-1 text-lg text-red-600 sm:mt-0 sm:col-span-2">{ credentials.prisonCode }</dd>

                                </div>
                            </dl>
                        </div>

                    </div>
                </form>
            </div> ) }


        </div>
    );
};

export default RetrieveEntity;
