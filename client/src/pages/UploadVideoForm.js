import React, { useState } from 'react';
import axios from 'axios';

const UploadVideoForm = () => {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
  });
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleChange = (e) => {
    setVideoData({ ...videoData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

//   const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!videoFile || videoFile.type !== 'video/mp4') {
    setUploadStatus('Please upload a valid MP4 file.');
    return;
  }

  const formData = new FormData();
  formData.append('title', videoData.title);
  formData.append('description', videoData.description);
  formData.append('video', videoFile);

  const token = localStorage.getItem('token'); 

  try {
    const res = await axios.post('http://localhost:5000/api/admin/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, 
    }});

    setUploadStatus('✅ Video uploaded successfully!');
    setVideoData({ title: '', description: '' });
    setVideoFile(null);
  } catch (err) {
    console.error('Video upload error:', err);
    setUploadStatus('❌ Failed to upload video.');
  }
};


  
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Video</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={videoData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={videoData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 p-2 rounded mt-1"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Video File (MP4)</label>
          <input
            type="file"
            name="video"
            accept="video/mp4"
            onChange={handleFileChange}
            required
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Video
        </button>

        {uploadStatus && (
          <div className="mt-4 text-sm font-medium text-gray-700">{uploadStatus}</div>
        )}
      </form>
    </div>
  );
};

export default UploadVideoForm;
