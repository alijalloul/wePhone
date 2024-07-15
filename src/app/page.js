import Hero from "./_components/Hero";
import Highlights from "./_components/Highlights";
import Model from "./_components/Model/Model";
import Nav from "./_components/Nav";

export default function Home() {
  return (
    <main className="bg-black h-full">
      <div className="h-screen flex flex-col">
        <Nav />
        <Hero />
      </div>

      <Highlights />

      <Model />
    </main>
  );
}
