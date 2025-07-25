import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    district: '',
    category: '',
    image: null,
    organizedBy: '',
    contact: '',
    address: '',
    maxAttendees: '',
  });

  const districts = [
    "Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayanagara", "Vijayapura", "Yadgiri"
  ];

  const categories = ["Business", "Dance", "Education", "Health", "Food", "Arts", "Workshop", "Finance"];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        image: files && files[0] ? files[0] : null
      }));
    } else if (name === 'contact') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [name]: digitsOnly
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        data.append("image", value); // send file object
      } else {
        data.append(key, value);
      }
    });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/admin/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert('Event added successfully!');
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          district: '',
          category: '',
          image: null,
          organizedBy: '',
          contact: '',
          address: '',
          maxAttendees: ''
        });
      }
    } catch (error) {
      console.error('Failed to add event:', error.response?.data || error.message);
      alert('Failed to add event, try again.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-md mt-10">
      <h2 className="text-xl font-bold mb-4">Post a New Local Event</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Event Title" className="input" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="input" required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} className="input" required />
        <select name="district" value={formData.district} onChange={handleChange} className="input" required>
          <option value="">Select District</option>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select name="category" value={formData.category} onChange={handleChange} className="input" required>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="input" required />
        <input type="text" name="organizedBy" value={formData.organizedBy} onChange={handleChange} placeholder="Organized By" className="input" required />
        <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} className="input" required maxLength={10} />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input" required />
        <input type="number" min={1} name="maxAttendees" value={formData.maxAttendees} onChange={handleChange} placeholder="Max Attendees (leave empty if Free for All)" className="input" />
        <button type="submit" className="mt-4 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
