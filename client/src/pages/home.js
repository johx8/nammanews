import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/events');
        const data = Array.isArray(res.data) ? res.data : res.data.events || [];
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="mb-6 text-gray-700">Explore the latest local events below:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link to={`/event/${event._id}`} key={event._id}>
            <div className="bg-white shadow-md rounded p-4 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-orange-600">{event.title}</h2>
              <p className="text-gray-600">{event.district}</p>
              <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>

      {events.length === 0 && <p className="mt-4 text-gray-500">No events available yet.</p>}
    </div>
  );
};

export default Home;
