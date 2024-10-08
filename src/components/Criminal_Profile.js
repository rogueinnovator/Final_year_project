"use client";
import { useAppContext } from "@/context/myContext";
import Image from "next/image";
const Criminal_Profile = () =>
{
  const { user } = useAppContext();
  return (
    <div>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <div className="card bg-base-100 w-2/3 shadow-xl">
            { " " }
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
                src="/images/profile.jpg"
                alt="Woman looking front"
                width={ 150 }
                height={ 100 }
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
                    <td>{ user?.email }</td>
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
                    <td>poqhwd98hq98</td>
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
                Delete{ " " }
              </button>
            </div>
          </div>
        </div>
        <div id="item2" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
            className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            className="w-full" />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs">1</a>
        <a href="#item2" className="btn btn-xs">2</a>
        <a href="#item3" className="btn btn-xs">3</a>
        <a href="#item4" className="btn btn-xs">4</a>
      </div></div>
    // <div className="flex-auto justify-between">


    // </div>
  );
};

export default Criminal_Profile;

