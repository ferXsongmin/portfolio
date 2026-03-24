import { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./VideoPage.css";

// ─────────────────────────────────────────────
//  ✏️  TAMBAH VIDEO DI SINI — tinggal copy-paste objek baru
//  Cukup isi url, sisanya opsional
// ─────────────────────────────────────────────
const VIDEOS = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dym2xxpvb/video/upload/v1774189697/WhatsApp_Video_2026-03-22_at_21.27.48_rfacla.mp4",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dym2xxpvb/video/upload/v1774362704/gyz_sujnrj.mp4", // ganti URL
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dym2xxpvb/video/upload/v1774362702/liz2_lyrqp6.mp4", // ganti URL
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dym2xxpvb/video/upload/v1774362556/liz_u4tjle.mp4", // ganti URL
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dym2xxpvb/video/upload/v1774362563/xinsoo_scivkd.mp4", // ganti URL
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dym2xxpvb/video/upload/v1774362705/songmin_ojiirx.mp4", // ganti URL
  },
  // ✏️ Tambah video baru: { id: 5, url: "https://..." },
];

// ─────────────────────────────────────────────
//  Single Video Player Component
// ─────────────────────────────────────────────
function VideoPlayer({ src, autoplay = false, isActive = true }) {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // ── Auto-unmute setelah user pertama kali interaksi ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unlock = () => {
      video.muted = false;
      setMuted(false);
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  // ── Pause ketika video tidak aktif (carousel / layout switch) ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isActive) {
      video.pause();
      setPlaying(false);
    }
  }, [isActive]);

  // ── Auto-pause saat discroll keluar viewport ──
  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          video.muted = true;
          setMuted(true);
          setPlaying(false);
        }
      },
      { threshold: 0.25 }, // pause saat <25% terlihat
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // ── Autoplay saat pertama mount ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoplay) return;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, [autoplay]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (v.paused) {
      v.muted = false;
      setMuted(false);
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (v.duration) setProgress((v.currentTime / v.duration) * 100);
  };

  const onSeek = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    const pct = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
    v.currentTime = pct * v.duration;
  };

  const fullscreen = (e) => {
    e.stopPropagation();
    // Fullscreen pada WRAPPER agar CSS :fullscreen contain bekerja
    const el = wrapRef.current;
    if (!el) return;
    el.requestFullscreen?.() ||
      el.webkitRequestFullscreen?.() ||
      el.mozRequestFullScreen?.() ||
      el.msRequestFullscreen?.();
  };

  return (
    <div ref={wrapRef} className="vp-wrap" onClick={togglePlay}>
      <video
        ref={videoRef}
        className="vp-video"
        src={src}
        muted
        loop
        playsInline
        onTimeUpdate={onTimeUpdate}
        onCanPlay={() => setLoaded(true)}
      />

      {!loaded && (
        <div className="vp-loading">
          <div className="vp-spinner" />
        </div>
      )}

      <div className="vp-controls">
        <div className="vp-progress" onClick={onSeek}>
          <div className="vp-progress-fill" style={{ width: progress + "%" }} />
        </div>
        <div className="vp-buttons">
          <button
            className="vp-btn"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
          >
            {playing ? (
              <Pause size={15} fill="currentColor" />
            ) : (
              <Play size={15} fill="currentColor" />
            )}
          </button>
          <button className="vp-btn" onClick={toggleMute}>
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <span className="vp-hint">
            {muted ? "tap to unmute" : "sound on"}
          </span>
          <button className="vp-btn vp-btn--right" onClick={fullscreen}>
            <Maximize size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Layout A — Vertical Stack
// ─────────────────────────────────────────────
// function LayoutVertical({ videos }) {
//   return (
//     <div className="layout-vertical">
//       {videos.map((v, i) => (
//         <div key={v.id} className="layout-vertical__item">
//           <VideoPlayer src={v.url} autoplay={i === 0} />
//         </div>
//       ))}
//     </div>
//   );
// }

// ─────────────────────────────────────────────
//  Layout B — Grid 2 Kolom
// ─────────────────────────────────────────────
// function LayoutGrid({ videos }) {
//   return (
//     <div className="layout-grid">
//       {videos.map((v) => (
//         <div key={v.id} className="layout-grid__item">
//           <VideoPlayer src={v.url} />
//         </div>
//       ))}
//     </div>
//   );
// }

// ─────────────────────────────────────────────
//  Layout C — Carousel
// ─────────────────────────────────────────────
function LayoutCarousel({ videos }) {
  const [active, setActive] = useState(0);
  const total = videos.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  return (
    <div className="layout-carousel">
      <div className="layout-carousel__stage">
        {videos.map((v, i) => {
          const isCenter = i === active;
          return (
            <div
              key={v.id}
              className={`layout-carousel__card ${isCenter ? "is-active" : ""}`}
              onClick={() => !isCenter && setActive(i)}
            >
              <VideoPlayer
                src={v.url}
                autoplay={isCenter}
                isActive={isCenter}
              />
            </div>
          );
        })}
      </div>

      <div className="layout-carousel__nav">
        <button className="layout-carousel__arrow" onClick={prev}>
          <ChevronLeft size={20} />
        </button>
        <div className="layout-carousel__dots">
          {videos.map((_, i) => (
            <span
              key={i}
              className={`layout-carousel__dot ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button className="layout-carousel__arrow" onClick={next}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Main Page
// ─────────────────────────────────────────────
const LAYOUTS = [
  // { key: "carousel", label: "Carousel" },
  // { key: "grid",     label: "Grid" },
  // { key: "", label: "Vertical" },
];

export default function VideoPage() {
  const [layout, setLayout] = useState("carousel");

  return (
    <div className="video-page">
      <div className="video-page__inner">
        {/* Header */}
        <div className="video-page__header">
          <p className="section-label">My Fineshyt</p>
          <h1 className="video-page__title">
            MBG<span className="video-page__dot">.</span>
          </h1>
        </div>

        {/* Layout switcher */}
        <div className="layout-switcher">
          {LAYOUTS.map((l) => (
            <button
              key={l.key}
              className={`layout-switcher__btn ${layout === l.key ? "is-active" : ""}`}
              onClick={() => setLayout(l.key)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Render layout */}
        <div className="layout-stage">
          {/* {layout === "vertical" && <LayoutVertical videos={VIDEOS} />} */}
          {/* {layout === "grid" && <LayoutGrid videos={VIDEOS} />} */}
          {layout === "carousel" && <LayoutCarousel videos={VIDEOS} />}
        </div>
      </div>
    </div>
  );
}
