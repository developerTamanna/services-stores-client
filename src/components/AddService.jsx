import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';

const AddService = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'AddService';
  }, []);

  const { user } = useContext(AuthContext);
  const [reviewDisabled] = useState(true);

  const handleAddService = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newServices = Object.fromEntries(formData.entries());

    // Add extra fields
    newServices.addedDate = new Date().toISOString();
    newServices.userEmail = user?.email || 'no-email@example.com';

    fetch('https://services-code-server.vercel.app/services', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newServices),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Service added successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          navigate('/services');
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add service. Please try again.',
        });
        console.error('Error adding service:', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black text-white rounded-xl shadow-lg mt-10">
      <div className="relative my-10">
        {/* Thin full-width line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-500"></div>
        </div>

        {/* Centered text */}
        <div className="relative flex justify-center">
          <span className="bg-black px-4 text-2xl font-semibold text-white">
             Added a new Services
          </span>
        </div>
      </div>

      <form onSubmit={handleAddService} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">Service Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Service Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter service title"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Company Name</label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Website</label>
          <input
            type="url"
            name="website"
            placeholder="Enter company website"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe the service"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select category</option>
            <option value="web-development">Web Development</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="consulting">Consulting</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Price (USD)</label>
          <input
            type="number"
            name="price"
            min="0"
            placeholder="Enter price"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={user?.email || ''}
            readOnly
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Add Service
        </button>
      </form>

      <div className="mt-10 border-t border-gray-700 pt-6">
        <h2 className="text-2xl font-semibold mb-4">Service Reviews</h2>

        <textarea
          placeholder="Reviews will be shown here. Writing reviews is disabled for now."
          disabled={reviewDisabled}
          className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-400 resize-none cursor-not-allowed"
          rows="4"
        ></textarea>

        <p className="mt-2 text-sm text-gray-400 italic">
          Review writing is disabled initially and only shown here for demo
          purposes.
        </p>
      </div>
    </div>
  );
};

export default AddService;
