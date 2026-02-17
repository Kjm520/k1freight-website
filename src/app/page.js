import Landing from "@/components/home/Landing";
import Services from "@/components/home/Services";
import Authority from "@/components/home/Authority";
import Image from "next/image";
import GalleryPreviewServer from "@/components/GalleryPreviewServer";


export default function Home() {
  return (
    <main>

      <Landing />
      <Services /><GalleryPreviewServer />
      <Image src="/structural/angle-transition.svg" alt="" width={1920} height={120} className="block w-full h-auto" priority />
      
      
      <Authority />
    </main>
  );
}
