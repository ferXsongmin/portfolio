import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import "./VideoPage.css";

// Ganti URL ini dengan link Cloudinary kamu
// Cara upload: cloudinary.com → Upload → copy URL video
// Format: https://res.cloudinary.com/YOUR_CLOUD/video/upload/v.../nama.mp4
const VIDEO_URL =
  "https://res.cloudinary.com/dym2xxpvb/video/upload/v1774189697/WhatsApp_Video_2026-03-22_at_21.27.48_rfacla.mp4"; // placeholder — ganti dengan URL cloudinary kamu

export default function VideoPage() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // autoplay saat halaman dibuka
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => {});
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const onSeek = (e) => {
    const v = videoRef.current;
    const pct = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
    v.currentTime = pct * v.duration;
  };

  const fullscreen = () => {
    videoRef.current.requestFullscreen?.();
  };

  return (
    <div className="video-page">
      <div className="video-page__inner">
        {/* Header */}
        <div className="video-page__header">
          <p className="section-label">My Fineshyt</p>
          <h1 className="video-page__title">
            MBG<span className="video-page__dot">.</span>
          </h1>
          <p className="video-page__sub">
            {/* A look at what I've built — no distractions, just the work. */}
          </p>
        </div>

        {/* Player */}
        <div className="video-player">
          <div className="video-player__wrap">
            {/* Video element */}
            <video
              ref={videoRef}
              className="video-player__video"
              src={VIDEO_URL}
              muted
              loop
              playsInline
              onTimeUpdate={onTimeUpdate}
              onCanPlay={() => setLoaded(true)}
              onClick={togglePlay}
            />

            {/* Loading state */}
            {!loaded && (
              <div className="video-player__loading">
                <div className="video-player__spinner" />
              </div>
            )}

            {/* Controls overlay */}
            <div className="video-player__controls">
              {/* Progress bar */}
              <div className="video-player__progress" onClick={onSeek}>
                <div
                  className="video-player__progress-fill"
                  style={{ width: progress + "%" }}
                />
              </div>

              {/* Buttons */}
              <div className="video-player__buttons">
                <button className="video-player__btn" onClick={togglePlay}>
                  {playing ? (
                    <Pause size={16} fill="currentColor" />
                  ) : (
                    <Play size={16} fill="currentColor" />
                  )}
                </button>

                <button className="video-player__btn" onClick={toggleMute}>
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <span className="video-player__label">
                  {muted ? "Tap to unmute" : "Sound on"}
                </span>

                <button
                  className="video-player__btn video-player__btn--right"
                  onClick={fullscreen}
                >
                  <Maximize size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        {/* <div className="video-page__info">
          <div className="video-page__info-card">
            <p className="video-page__info-label">Stack</p>
            <p className="video-page__info-val">Laravel · React · MySQL</p>
          </div>
          <div className="video-page__info-card">
            <p className="video-page__info-label">Type</p>
            <p className="video-page__info-val">Web Application</p>
          </div>
          <div className="video-page__info-card">
            <p className="video-page__info-label">Year</p>
            <p className="video-page__info-val">2025</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
