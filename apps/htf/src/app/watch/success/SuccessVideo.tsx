"use client";

export default function SuccessVideo() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/5">
      <video
        className="w-full aspect-video"
        controls
        autoPlay
        playsInline
        controlsList="nodownload"
      >
        <source src="/images/sophia-smiles-full.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
