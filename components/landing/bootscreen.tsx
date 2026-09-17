"use client";

import { useEffect, useRef, useState } from "react";

type BootScreenProps = {
  onFinish: () => void;
};

export default function BootScreen({ onFinish }: BootScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set muted as both a property and default *before* calling play().
    // Doing this imperatively avoids the JSX-attribute timing gap that
    // trips up Safari's autoplay-eligibility check.
    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was blocked by the browser — resume on first
          // user interaction instead of leaving a dead play button.
          const resume = () => {
            video.play().catch(() => {});
            window.removeEventListener("touchstart", resume);
            window.removeEventListener("click", resume);
          };
          window.addEventListener("touchstart", resume, { once: true, passive: true });
          window.addEventListener("click", resume, { once: true });
        });
      }
    };

    tryPlay();
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        onLoadedData={() => setReady(true)}
        onEnded={onFinish}
      >
        <source src="/WdBoot.mp4" type="video/mp4" />
      </video>
    </div>
  );
}