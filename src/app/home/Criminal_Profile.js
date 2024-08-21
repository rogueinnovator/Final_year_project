"use client";
import React from "react";
import Image from "next/image";

const Criminal_Profile = () => {
  return (
    // <div className="flex-auto justify-between">
    <div className="card bg-base-100 w-2/3 shadow-xl">
      {" "}
      <div className="rounded-t-lg h-32 overflow-hidden">
        <Image
          className="object-cover object-top w-full"
          src="/images/pic2.jpg"
          alt="Mountain"
          width={800}
          height={800}
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <Image
          className="object-cover object-center h-32"
          src="/images/profile.jpg"
          alt="Woman looking front"
          width={150}
          height={100}
        />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-bold">Muhammad Huzaifa</h2>
        <p className="text-gray-500">17101-91829-19237</p>
      </div>
      <ul className="py-4 text-gray-700 flex items-center justify-between">
        <table className="table mx-3">
          <tbody>
            <tr className="hover">
              <th></th>
              <td className="font-bold text-white">Name</td>
              <td>Huzaifa</td>
            </tr>
            <tr className="hover">
              <th></th>
              <td className="font-bold text-white">Id</td>
              <td>121</td>
            </tr>
            <tr className="hover">
              <th></th>
              <td className="font-bold text-white">Father Name</td>
              <td>alli</td>
            </tr>
          </tbody>
        </table>
        <table className="table mx-3">
          <tbody>
            <tr className="hover">
              <th></th>
              <td className="font-bold text-white">crime details</td>
              <td>poqhwd98hq[98</td>
            </tr>
            <tr className="hover">
              <th></th>
              <td className="font-bold text-white">address</td>
              <td>thioaoinaoicn</td>
            </tr>
            <tr className="hover">
              <th></th>
              <td className="font-bold text-white">PS</td>
              <td>qwdoin</td>
            </tr>
          </tbody>
        </table>
      </ul>
      <div className="py-4 flex mx-8 mt-4">
        <button className="btn btn-outline btn-primary rounded-full mx-auto px-4">
          Edit
        </button>
        <button className="btn btn-outline btn-warning rounded-full mx-auto px-4">
          Delete{" "}
        </button>
      </div>
    </div>
    // </div>
  );
};

export default Criminal_Profile;
