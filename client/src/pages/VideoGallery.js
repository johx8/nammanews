import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/videos')
      .then(res => {
        console.log("Video response:", res.data);
        setVideos(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Error fetching videos:", err);
        setVideos([]); // fallback to empty array if error
      });
  }, []);

  const getYoutubeThumbnail = (link) => {
    const videoId = link.split('v=')[1]?.split('&')[0];
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {videos.length === 0 ? (
        <p className="col-span-3 text-center text-gray-500">No videos available.</p>
      ) : (
        videos.map((video) => (
          <div key={video._id} className="border rounded shadow p-4 bg-white">
            <h3 className="text-lg font-semibold">{video.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{video.description}</p>

            {video.videoUrl ? (
              <video controls className="w-full">
                <source src={`http://localhost:5000${video.videoUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : video.youtubeLink ? (
              <a href={video.youtubeLink} target="_blank" rel="noreferrer">
                <img
                  src={getYoutubeThumbnail(video.youtubeLink)}
                  alt="YouTube thumbnail"
                  className="w-full rounded"
                />
              </a>
            ) : (
              <p className="text-red-500">No video or link provided.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default VideoGallery;
