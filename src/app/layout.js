// ROOT LAYOUT - Wraps all routes

import "./globals.css";

export const metadata = {
  title: "K1 Freight",
  description: "Premium Freight Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col w-screen min-h-screen bg-gray-700 bg-gradient-to-bl from-[#032e55] to to-black -z-10">
        {children}
        </main>
        </body>


    </html>
  );
}
