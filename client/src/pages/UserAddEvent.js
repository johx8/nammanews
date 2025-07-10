import React, { useState } from 'react';
import axios from 'axios';

const UserAddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    district: '',
    category: '',
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const districts = [
    "Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada","Vijayanagara", "Vijayapura", "Yadgiri"
  ];

  const categories = [
    "Business", "Dance", "Education", "Health", "Food", "Arts", "Workshop", "Finance", "Advertisements"// Add any others you support...
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      // If you're using token-based auth, include it here:
      const token = localStorage.getItem('token');

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
  },
};

await axios.post('http://localhost:5000/api/user/events', formData, config);

      setSuccessMessage('Event submitted successfully! Pending admin approval.');
      setErrorMessage('');
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        district: '',
        category: '',
        image: null,
      });
    } catch (error) {
      console.error('Error submitting event:', error);
      setErrorMessage('Failed to submit event. Try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="ml-60 p-6">
      <h1 className="text-2xl font-bold mb-6">Submit a New Event</h1>

      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-full max-w-xl">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          rows="4"
          required
        />

        <div className="flex gap-4 mb-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>

        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="">Select District</option>
          {districts.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="">Select Category</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="w-full p-2 border rounded mb-4"
          accept="image/*"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default UserAddEvent;
