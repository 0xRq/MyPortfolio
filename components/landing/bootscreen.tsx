"use client";

import { useState } from "react";

type BootScreenProps = {
  onFinish: () => void;
};

export default function BootScreen({ onFinish }: BootScreenProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <video
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