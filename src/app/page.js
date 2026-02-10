import NavBar from "@/components/structural/NavBar";
import Landing from "@/components/landing/Landing";
import Services from "@/components/landing/Services";
import Authority from "@/components/landing/Authority";
import GalleryPreview from "@/components/landing/GalleryPreview";
import Footer from "@/components/structural/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Landing />
      <Services />
      <Image src="/structural/angle_transition.svg" alt="" width={1920} height={120} className="block w-full h-auto" priority />
      <Authority />
      <GalleryPreview />
      <Footer />
    </main>
  );
}
