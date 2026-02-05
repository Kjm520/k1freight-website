import NavBar from "@/components/NavBar";
import Landing from "@/components/Landing";
import Services from '@/components/Services'
import Authority from "@/components/Authority";
import GalleryPreview from "@/components/GalleryPreview";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main>
      <NavBar />
      <Landing />
      <Services />
      <Authority />
      <GalleryPreview />
      <Footer />
    </main>
  )
}
