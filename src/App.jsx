import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Resume from "./sections/Resume";
import Gallery from "./sections/Gallery";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import ScrollProgress from "./components/ScrollProgress";
import ScrollDots from "./components/ScrollDots";
import "./App.css";

export default function App() {
  const cursorRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const spotlight = spotlightRef.current;

    const onMove = (e) => {
      // cursor titik kecil — langsung snap
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      // spotlight glow — langsung ikut juga
      spotlight.style.left = e.clientX + "px";
      spotlight.style.top = e.clientY + "px";
    };

    const onEnter = () => (spotlight.style.opacity = "1");
    const onLeave = () => (spotlight.style.opacity = "0");

    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseenter", onEnter);
    document.body.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseenter", onEnter);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Cursor titik putih kecil */}
      <div className="cursor" ref={cursorRef} />

      {/* Spotlight glow mengikuti cursor */}
      <div className="cursor-spotlight" ref={spotlightRef} />
      <ScrollProgress />
      <Navbar />
      <ScrollDots />
      <main>
        <Hero />
        <About />
        <Resume />
        <Gallery />
        <Portfolio />
        <Contact />
      </main>
    </>
  );
}
