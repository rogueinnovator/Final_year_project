"use client";
import { useAppContext } from '@/context/myContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser, getAllUsers } from '@/services/userServices';

const UserDetails = () =>
{
    const [ allUsers, setAllUsers ] = useState( [] );

    const fetchUsers = async () =>
    {
        try
        {
            const response = await getAllUsers();
            setAllUsers( response.users );
        } catch ( error )
        {
            console.error( "Error fetching users", error );
        }
    };

    const deleteMutation = useMutation( {
        mutationFn: deleteUser,
        onSuccess: ( variables ) =>
        {
            setAllUsers( ( prevUsers ) => prevUsers.filter( ( user ) => user._id !== variables.userId ) );
        },
        onError: ( error ) =>
        {
            console.log( "Error deleting user", error );
        },
    } );

    const handleDelete = ( id ) =>
    {
        deleteMutation.mutate( id );
    };

    useEffect( () =>
    {
        fetchUsers();
    }, [] );

    return (
        <div className="card bg-base-100 w-auto shadow-xl">
            <div className="card bg-base-100 w-auto shadow-xl">
                <div className="overflow-x-auto">
                    <h1 className="flex m-4 text-4xl font-extrabold leading-none tracking-tight justify-center text-gray-700 md:text-5xl lg:text-6xl">
                        Users Detail
                    </h1>
                </div>
            </div>
            <div className="overflow-x-auto">
                { allUsers.length === 0 ? ( <> <h1 className="flex m-4 text-4xl font-extrabold leading-none tracking-tight justify-center text-red-600 md:text-5xl lg:text-6xl">
                    No user found
                </h1></> ) : ( <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { allUsers.map( ( user ) => (
                            <tr key={ user._id }>
                                <td>
                                    <div className="flex items-center gap-3 ml-6">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <Image
                                                    alt="User profile"
                                                    src={ user.photoUrl }
                                                    width={ 56 }
                                                    height={ 56 }
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold pl-4 ">{ user.name.toUpperCase() }</div>
                                            <div className="text-sm opacity-50">
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{ user.email }</td>
                                <td>{ user.id }</td>

                                <td>
                                    <button
                                        className="btn btn-outline btn-warning rounded-full mx-auto px-4"
                                        onClick={ () => handleDelete( user._id ) }
                                        disabled={ deleteMutation.isLoading }
                                    >
                                        { deleteMutation.isLoading ? "Deleting..." : "Delete" }
                                    </button>
                                </td>
                                {/* <th>
                                    <Link className="btn btn-outline btn-success rounded-full mx-auto px-4" href={ `/users/${ user._id }` }>
                                        Details
                                    </Link>
                                </th> */}
                            </tr>
                        ) ) }
                    </tbody>
                </table> ) }

            </div>
        </div>
    );
};

export default UserDetails;
