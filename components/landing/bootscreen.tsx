"use client";

type BootScreenProps = {
  onFinish: () => void;
};

export default function BootScreen({ onFinish }: BootScreenProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
      >
        <source src="/boot.mp4" type="video/mp4" />
      </video>
    </div>
  );
}