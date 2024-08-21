import { Inter } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "../components/Navbar";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "C I M S",
  description: "Criminal Information Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/pic2.jpg')" }}
        />
        
        {/* Content Layer */}
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
