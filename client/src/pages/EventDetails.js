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
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md font-sans">
      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT SIDE: Title, Main Image or All Images if only 1 */}
        <div className="md:w-1/2">
          {event.imageUrl?.length === 1 && (
            <img
              src={`http://localhost:5000${event.imageUrl[0]}`}
              alt="Event"
              className="w-full h-[300px] object-cover mb-4 rounded"
            />
          )}

          {event.imageUrl?.length === 2 && (
            <img
              src={`http://localhost:5000${event.imageUrl[0]}`}
              alt="Main Event"
              className="w-full h-[300px] object-cover mb-4 rounded"
            />
          )}

          <h2 className="text-xl uppercase text-gray-500 mb-2 tracking-wide">
            {event.date && new Date(event.date).toLocaleDateString()} | {event.time}
          </h2>
          <h1 className="text-3xl font-bold mb-2 leading-snug text-gray-800">{event.title}</h1>
          <p className="text-md text-gray-600 mb-3 italic">{event.district} | {event.category}</p>
          <p className="text-gray-700 text-lg">{event.description}</p>

          {event.youtubeLink && (
            <div className="mt-6">
              <iframe
                width="100%"
                height="280"
                src={event.youtubeLink.replace("watch?v=", "embed/")}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>
          )}

          {event.isAdvertisement && event.redirectUrl && (
            <a
              href={event.redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              Visit Advertisement
            </a>
          )}
        </div>

        {/* RIGHT SIDE: Second image if exists */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {event.imageUrl?.length === 2 && (
            <img
              src={`http://localhost:5000${event.imageUrl[1]}`}
              alt="Additional"
              className="w-full h-[180px] object-cover rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;


