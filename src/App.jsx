import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Resume from "./sections/Resume";
import Gallery from "./sections/Gallery";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import ScrollProgress from "./components/ScrollProgress";
import ScrollDots from "./components/ScrollDots";
import VideoPage from "./pages/VideoPage";
import "./App.css";

function CursorEffects() {
  const cursorRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const spotlight = spotlightRef.current;

    const onMove = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
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
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-spotlight" ref={spotlightRef} />
    </>
  );
}

// Halaman utama — sama persis seperti sebelumnya
function HomePage() {
  return (
    <>
      <ScrollProgress />
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

export default function App() {
  return (
    <BrowserRouter>
      <CursorEffects />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}