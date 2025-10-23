import NavBar from "@/components/NavBar";
import Landing from "@/components/Landing";
import Services from '@/components/Services'


export default function Home() {
  return (
    <main className="flex flex-col">
      <NavBar></NavBar>
      <Landing></Landing>
      <Services></Services>
    </main>
  )
}
