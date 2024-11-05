"use client";
import { useAppContext } from "@/context/myContext";
import { useState, useEffect } from "react";
import sanitizeData from "@/helper/sanitizeData";

const CriminalsDetail = () =>
{
    const { web3, wallet, contractInstance } = useAppContext();
    const account = wallet?.account[ 0 ];
    const [ allCriminals, setAllCriminals ] = useState( [] );
    const [ loading, setLoading ] = useState( false );

    const fetchCriminals = async () =>
    {
        if ( !web3 || !contractInstance ) return;
        setLoading( true );
        try
        {
            const data = await contractInstance.methods.getAllCriminals().call( { from: account } );
            const criminals = sanitizeData( data ); // Sanitize the data if necessary

            const formattedCriminals = criminals.map( ( criminal ) =>
            {
                return {
                    name: criminal.personal.name || "",
                    fatherName: criminal.personal.fatherName || "",
                    cnic: criminal.personal.cnic || "",
                    gender: criminal.personal.gender || "",
                    dob: criminal.personal.dob || "",
                    location: criminal.personal.location || ""
                };
            } );

            setAllCriminals( formattedCriminals );

        } catch ( error )
        {
            console.error( "Error fetching criminals", error );
        } finally
        {
            setLoading( false );
        }
    };

    useEffect( () =>
    {
        fetchCriminals();
    }, [ web3, contractInstance ] ); 

    return (
        <div className="flex-auto justify-center px-5">
            <div className="card bg-base-100 shadow-xl h-screen w-screen">
                <div className="card bg-base-100 w-auto shadow-xl">
                    <div className="overflow-x-auto">
                        <h1 className="flex m-4 text-4xl font-extrabold leading-none tracking-tight justify-center text-gray-700 md:text-5xl lg:text-6xl">
                            All Criminals
                        </h1>

                    </div>
                </div>

                { loading && (
                    <div className="flex justify-center items-center my-4">
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
                ) }

                <div className="overflow-x-auto">
                    { allCriminals.length === 0 && !loading ? (
                        <h1 className="flex m-4 text-4xl font-extrabold leading-none tracking-tight justify-center text-red-600 md:text-5xl lg:text-6xl">
                            No user found
                        </h1>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Father Name</th>
                                    <th>CNIC</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                { allCriminals.map( ( criminal, index ) => (
                                    <tr key={ index }>
                                        <td>{ criminal.name }</td>
                                        <td>{ criminal.fatherName }</td>
                                        <td>{ criminal.cnic }</td>
                                        <td>{ criminal.gender }</td>
                                        <td>{ criminal.dob }</td>
                                        <td>{ criminal.location }</td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                    ) }
                </div>
            </div>
        </div>
    );
};

export default CriminalsDetail;
