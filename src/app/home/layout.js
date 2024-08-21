import React from "react";
import Image from "next/image";
const HomeLayout = ({ children }) => {
  const path = "/images/pic2.jpg";
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen ">
      {/* <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pic2.jpg')", opacity: 0.4 }}
      ></div> */}

      {children}
    </div>
  );
};

export default HomeLayout;
