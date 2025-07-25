import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const districts = [
  "Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar",
  "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag",
  "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara",
  "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayanagara", "Vijayapura", "Yadgiri"
];

const categories = [
  "Business", "Dance", "Education", "Health", "Food", "Arts", "Workshop", "Finance", "Advertisements"
];

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [viewAttendees, setViewAttendees] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/events');
      const data = Array.isArray(res.data) ? res.data : res.data.events || [];
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent(prev => ({ ...prev, [name]: value }));
  };

  const updateEvent = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/events/${editEvent._id}`, editEvent);
      setEditEvent(null);
      fetchEvents(); // Refresh list
    } catch (err) {
      console.error('Error updating event:', err);
    }
  };

  const downloadPDF = (attendees, title) => {
    const doc = new jsPDF();
    doc.text(`Attendees for ${title}`, 14, 15);
    const tableRows = attendees.map((att, index) => [
      index + 1,
      att.name,
      att.email,
      new Date(att.registeredAt).toLocaleString()
    ]);
    doc.autoTable({
      head: [['#', 'Name', 'Email', 'Registered At']],
      body: tableRows,
      startY: 20
    });
    doc.save(`${title}_attendees.pdf`);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow rounded">
          <thead>
            <tr className="bg-orange-100">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">District</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id} className="border-t">
                <td className="p-3">{event.title}</td>
                <td className="p-3">{event.district}</td>
                <td className="p-3">{new Date(event.date).toLocaleDateString()}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setEditEvent(event)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(event._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setViewAttendees(event)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Attendees
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Event Modal */}
      {editEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Event</h2>
            <input
              type="text"
              name="title"
              value={editEvent.title}
              onChange={handleEditChange}
              className="w-full p-2 mb-3 border rounded"
              placeholder="Title"
            />
            <textarea
              name="description"
              value={editEvent.description}
              onChange={handleEditChange}
              className="w-full p-2 mb-3 border rounded"
              placeholder="Description"
            />
            <select
              name="category"
              value={editEvent.category}
              onChange={handleEditChange}
              className="w-full p-2 mb-3 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              name="district"
              value={editEvent.district}
              onChange={handleEditChange}
              className="w-full p-2 mb-3 border rounded"
            >
              <option value="">Select District</option>
              {districts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
            <input
              type="date"
              name="date"
              value={editEvent.date?.substring(0, 10)}
              onChange={handleEditChange}
              className="w-full p-2 mb-3 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditEvent(null)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
              <button onClick={updateEvent} className="bg-green-600 text-white px-3 py-1 rounded">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Attendee Modal */}
      {viewAttendees && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Attendees for: {viewAttendees.title}</h2>
            {viewAttendees.registeredUsers.length > 0 ? (
              <>
                <table className="w-full table-auto mb-4 border">
                  <thead>
                    <tr className="bg-orange-100">
                      <th className="p-2">#</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Registered At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewAttendees.registeredUsers.map((user, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{new Date(user.registeredAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => downloadPDF(viewAttendees.registeredUsers, viewAttendees.title)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Download PDF
                </button>
              </>
            ) : (
              <p className="text-gray-600">No attendees have registered yet.</p>
            )}
            <div className="mt-4 text-right">
              <button onClick={() => setViewAttendees(null)} className="text-red-600 underline">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
