import Image from "next/image";

export default function AuthLayout({ children }) {
  const path = "/images/pic4.png";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pic3.jpg')", opacity: 0.4 }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-8">
          {" "}
          <Image src={path} alt="logo" width={180} height={30} />
        </div>
        {children}
      </div>
    </div>
  );
}
