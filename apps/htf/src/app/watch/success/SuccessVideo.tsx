"use client";

export default function SuccessVideo({ sessionId }: { sessionId?: string }) {
  const src = sessionId
    ? `/api/film?session_id=${encodeURIComponent(sessionId)}`
    : "/api/film";

  return (
    <div className="rounded-2xl overflow-hidden bg-htf-bg-muted border border-htf-border">
      <video
        className="w-full aspect-video"
        controls
        autoPlay
        playsInline
        controlsList="nodownload"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
