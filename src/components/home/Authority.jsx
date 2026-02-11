export default function Authority() {
  return (
    <section className="relative flex h-[calc(100vh-400px)] items-center justify-center">
      <div className="absolute inset-0 bg-[url('/structural/jcbrgn.jpg')] bg-cover bg-center z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 to-transparent z-5" /> {/*Or fade up from the blue 0252da*/}

      <div className="relative z-20 text-white text-5xl text-center max-w-4xl px-6">
        Far Reaching Experience,
        <br /> Countless Success Stories
      </div>
    </section>
  );
}
