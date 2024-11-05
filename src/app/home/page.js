import React from "react";
import CreateEntity from "@/components/CreateEntity";
import UserDetails from "@/components/UserDetails";
import CriminalsDetail from "@/components/CriminalsDetail";
import RetrieveEntity from "@/components/RetrieveEntity";

const Page = () =>
{
  return (
    <div className="h-screen">
      <div className="carousel w-screen h-full">
        <div id="item1" className="carousel-item h-screen w-screen">
          <RetrieveEntity />
        </div>
        <div id="item2" className="carousel-item h-screen w-screen">
          <CreateEntity />
        </div>
        <div id="item3" className="carousel-item h-screen w-screen">
          <CriminalsDetail />
        </div>
      </div>

      {/* Sticky buttons container */ }
      <div className="flex w-full justify-center gap-2 sticky bottom-0 mb-6">
        <a href="#item1" className="btn btn-outline btn-ghost rounded-full">
          Retrieve Entity
        </a>
        <a href="#item2" className="btn btn-outline btn-ghost rounded-full">
          Create Entities
        </a>
        <a href="#item3" className="btn btn-outline btn-ghost rounded-full">
          All Entities
        </a>
      </div>
    </div>
  );
};

export default Page;
