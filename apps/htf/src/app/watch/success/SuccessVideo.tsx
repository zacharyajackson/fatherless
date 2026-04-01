"use client";

export default function SuccessVideo() {
  return (
    <div className="rounded-2xl overflow-hidden bg-htf-bg-muted border border-htf-border">
      <video
        className="w-full aspect-video"
        controls
        autoPlay
        playsInline
        controlsList="nodownload"
      >
        <source src="https://aeocstmxpo4h9be9.public.blob.vercel-storage.com/sophia-smiles-full.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
