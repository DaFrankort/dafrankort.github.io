import React, { ReactNode } from "react";

const YouTubeEmbed: React.FC<{ youtubeUrl: string }> = ({ youtubeUrl }) => {
  return (
    <div className="w-full overflow-hidden shadow-lg aspect-video rounded-3xl">
      <iframe
        src={youtubeUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
