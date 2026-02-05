import Image from "next/image";

export default function Landing() {
  return (
    <div className="relative h-screen overflow-hidden">


      <div
        className="absolute inset-0 bg-black bg-no-repeat bg-center bg-cover opacity-100 -z-10"
      ></div>



      {/* First Layer */}
      <div
        className="absolute inset-0 bg-[url('/structural/landingflatbed.jpg')] bg-no-repeat bg-center bg-cover opacity-80 z-0"
      ></div>


      {/* Second Layer */}
      <div
        className="absolute inset-0 bg-[url('/structural/handshake.png')] bg-no-repeat bg-center bg-cover opacity-100 z-10"
      ></div>

      {/* Darkening Layer */}
      <div
        className="absolute inset-0 bg-black bg-no-repeat bg-center bg-cover opacity-50 z-15"
      ></div>

      {/* Foreground Layer */}
      <div className="relative z-20 flex min-h-screen justify-center items-center text-white text-center px-6">
        <div>
          <h1 className="text-5xl font-bold mb-4">K1 Freight</h1>
          <p className="text-2xl mb-2">A Better Way To Navigate Logistics</p>
          <p className="max-w-2xl mx-auto">
            At K1, logistics isn't just what we do, it's what we excel at. We're more than just a service provider—we're your partner for success and peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
}
