import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const AdminDashboard = () => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    district: '',
    category: '',
    images: [],
    youtubeLink: '',
    isAdvertisement: false,
    redirectUrl: ''
  });

  const districts = [
    "Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada","Vijayanagara", "Vijayapura", "Yadgiri"];
  const categories = [
    "Business", "Dance", "Education", "Health", "Food", "Arts", "Workshop", "Finance"];
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
      if (type === 'file'){
        setFormData(prev => ({
          ...prev,
          [name]: [...files].slice(0, 2)
        }));
      }
      else if (type === 'checkbox') {
        setFormData(prev => ({
          ...prev, [name]: checked
        }));
      } 
      else {
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
        if(key !== 'images') {
          data.append(key, value);
        }
      });
       formData.images.forEach((file) => {
    data.append('images', file); // use the same key for multer.array('images')
  });
      try {
        const token = localStorage.getItem('token');
        console.log('FormData:', formData);

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
            images: [],
            youtubeLink: '',
            isAdvertisement: false,
            redirectUrl: ''
          });

          
        }
       } catch (error) {
          console.error('Failed to add event:', error);
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

        {/* <input name="subDistrict" value={formData.subDistrict} onChange={handleChange} placeholder="Sub-location (Optional)" className="input" /> */}

        <select name="category" value={formData.category} onChange={handleChange} className="input" required>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <input type="file" name="images" accept="image/*" onChange={handleChange} className="input" multiple/>

        <input type="text" name="youtubeLink" value={formData.youtubeLink} onChange={handleChange} placeholder="YouTube Video Link" className="input" />

        <label className="block mt-4">
          <input type="checkbox" name="isAdvertisement" checked={formData.isAdvertisement} onChange={handleChange} />
          <span className="ml-2">This is an advertisement</span>
        </label>

        {formData.isAdvertisement && (
          <input type="text" name="redirectUrl" value={formData.redirectUrl} onChange={handleChange} placeholder="Ad Redirect URL" className="input" />
        )}

        <button type="submit" className="mt-4 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">Submit Event</button>
      </form>
    </div>
  );
};

export default AdminDashboard;


