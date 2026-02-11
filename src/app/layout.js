// ROOT LAYOUT - Wraps all routes

import NavBar from "@/components/structural/NavBar";
import "./globals.css";
import Footer from "@/components/structural/Footer";

export const metadata = {
  title: "K1 Freight",
  description: "Premium Freight Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <NavBar />
        <main className="flex flex-col w-screen min-h-screen bg-gray-700 bg-gradient-to-bl from-[#032e55] to-black ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
