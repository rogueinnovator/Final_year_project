"use client";
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/services/userServices';
import Image from 'next/image';
import Link from 'next/link';

const UserDetails = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                if (response.success) {
                    setAllUsers(response.users);
                } else {
                    setError('Failed to fetch users');
                }
            } catch (err) {
                setError('An error occurred while fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="card bg-base-100 w-auto shadow-xl">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <Image
                                                    alt="User Photo"
                                                    src={user.photoUrl || '/images/default.jpg'}
                                                    width={56}
                                                    height={56}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <Image
                                        alt="User Photo"
                                        src={user.photoUrl || '/images/default.jpg'}
                                        width={50}
                                        height={50}
                                    />
                                </td>
                                <th>
                                    <Link className="btn btn-ghost btn-xs" href={`/users/${user._id}`}>Details</Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetails;
