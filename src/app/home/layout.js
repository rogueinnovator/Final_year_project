import React from "react";
import Image from "next/image";
const HomeLayout = ( { children } ) =>
{
  const path = "/images/pic2.jpg";
  return (
    <div className="pt-11 h-full">
      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pic2.jpg')", opacity: 0.4 }}
      ></div> */}
      { children }
    </div>
  );
};

export default HomeLayout;
