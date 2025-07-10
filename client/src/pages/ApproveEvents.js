import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApproveEvents = () => {
  const [pendingEvents, setPendingEvents] = useState([]);

  const fetchPending = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/pending-events', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPendingEvents(res.data.events);
    } catch (err) {
      console.error('Error fetching pending events:', err);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/approve-event/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPending(); // refresh
    } catch (err) {
      console.error('Error approving event:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/reject-event/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPending();
    } catch (err) {
      console.error('Error rejecting event:', err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pending Event Approvals</h2>
      {pendingEvents.length === 0 ? (
        <p>No pending events.</p>
      ) : (
        <div className="grid gap-4">
          {pendingEvents.map(event => (
            <div key={event._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-bold">{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>District:</strong> {event.district}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <div className="flex gap-4 mt-3">
                <button onClick={() => handleApprove(event._id)} className="bg-green-500 text-white px-4 py-1 rounded">Approve</button>
                <button onClick={() => handleReject(event._id)} className="bg-red-500 text-white px-4 py-1 rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApproveEvents;
