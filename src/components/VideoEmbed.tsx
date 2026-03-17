interface VideoEmbedProps {
  src: string;
  title?: string;
  type?: "youtube" | "vimeo" | "local";
  className?: string;
}

export default function VideoEmbed({
  src,
  title = "Video preview",
  type = "youtube",
  className = "",
}: VideoEmbedProps) {
  if (type === "youtube") {
    // Extract YouTube video ID from various URL formats
    const videoId = src.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    if (!videoId) return null;
    
    return (
      <div className={`aspect-video w-full overflow-hidden rounded-xl ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }
  
  if (type === "vimeo") {
    const videoId = src.match(/vimeo\.com\/(\d+)/)?.[1];
    if (!videoId) return null;
    
    return (
      <div className={`aspect-video w-full overflow-hidden rounded-xl ${className}`}>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }
  
  // Local video
  return (
    <div className={`aspect-video w-full overflow-hidden rounded-xl ${className}`}>
      <video
        src={src}
        controls
        className="h-full w-full"
        title={title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

