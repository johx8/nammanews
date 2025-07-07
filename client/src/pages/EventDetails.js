import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error('Error fetching event details', err);
    }
  };
  fetchEvent();
}, [id]);

  if (!event) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded mt-6">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600">{new Date(event.date).toDateString()} at {event.time}</p>
      <p className="mt-2 text-orange-600">{event.district} | {event.category}</p>
      {event.imageUrl && (
        <img src={`http://localhost:5000${event.imageUrl}`} alt="event" className="my-4 w-full max-h-[400px] object-cover rounded" />
      )}
      <p className="text-lg text-gray-700 mt-4">{event.description}</p>

      {event.youtubeLink && (
        <div className="mt-6">
          <iframe
            width="100%"
            height="315"
            src={event.youtubeLink.replace("watch?v=", "embed/")}
            title="YouTube Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {event.isAdvertisement && event.redirectUrl && (
        <a
          href={event.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-6 text-blue-600 hover:underline"
        >
          Visit Advertisement
        </a>
      )}
    </div>
  );
};

export default EventDetails;
