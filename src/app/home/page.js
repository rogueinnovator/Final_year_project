import React from "react";
import CreateCriminal from "@/components/CreateCriminal";
import UserDetails from "@/components/UserDetails";
import CriminalsDetail from "@/components/CriminalsDetail";

const Page = () =>
{
  return (
    <div className="h-screen">
      <div className="carousel w-screen">
        <div id="item1" className="carousel-item h-screen w-screen">
          <CreateCriminal />
        </div>
        <div id="item2" className="carousel-item h-screen w-screen">
          <CriminalsDetail />
        </div>
        <div id="item3" className="carousel-item h-screen w-screen">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            className="w-full h-full object-cover" />
        </div>
        <div id="item4" className="carousel-item h-screen w-screen">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 absolute bottom-0 mb-10">
        <a href="#item1" className="btn btn-outline btn-primary">Create Entity</a>
        <a href="#item2" className="btn btn-outline btn-primary">All Entities</a>
        <a href="#item3" className="btn btn-outline btn-warning">Delete Entity</a>
      </div>
    </div>
  );
};

export default Page;
