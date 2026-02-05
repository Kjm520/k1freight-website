import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="flex flex-col border-white border-1 h-24 justify-center">
      <nav className="flex border-1 border-white h-full">

        {/* left */}
        <section className="flex w-1/2 border-1 border-white items-center justify-center relative">
          <Link href="/" className="relative w-1/2 h-3/4 border-1 border-white">
            <Image
              src="/logos/websiteheaderwordmark.svg"
              alt="K1 Freight Logo"
              fill
              className="object-contain"
            />
          </Link>
        </section>

        {/* right */}
        <section className="flex w-1/2 border-1 border-white items-center justify-around">
          <Link className="border-1 border-white" href="/">
            Home
          </Link>
          <Link className="border-1 border-white" href="/contact">
            Contact
          </Link>
          <Link className="border-1 border-white" href="/gallery">
            Gallery
          </Link>
        </section>
      </nav>
    </header>
  );
}
