import Announcements from "./_components/Announcements";
import CalendarSection from "./_components/CalendarSection";
import ClassStage from "./_components/ClassStage";
import Contact from "./_components/Contact";
import EnrollCallout from "./_components/EnrollCallout";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Kural from "./_components/Kural";
import Loader from "./_components/Loader";
import Nav from "./_components/Nav";
import PhotoTrack from "./_components/PhotoTrack";
import Statement from "./_components/Statement";
import Structure from "./_components/Structure";

// Announcements come from a Google Sheet; re-check it at most once a minute.
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        {/* hero stays pinned while the Kural panel slides over it */}
        <div className="relative">
          <Hero />
          <Kural />
        </div>
        <Statement />
        <Announcements />
        <CalendarSection />
        {/* both cards link downward: In Class -> Structure, On Stage -> photos */}
        <ClassStage />
        <PhotoTrack />
        <Structure />
        <EnrollCallout />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
