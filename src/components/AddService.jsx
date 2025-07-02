import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router'; // ← react-router-dom
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

    newServices.addedDate = new Date().toISOString();
    newServices.userEmail = user?.email || 'no-email@example.com';

    fetch('https://services-code-server.vercel.app/services', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
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
      .catch(() =>
        Swal.fire(
          'Oops...',
          'Failed to add service. Please try again.',
          'error'
        )
      );
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
      {/* Section title */}
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-gray-900 px-4 text-2xl font-bold">
            Add a New Service
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleAddService} className="space-y-6">
        {[
          { name: 'image', label: 'Service Image URL', type: 'text' },
          { name: 'title', label: 'Service Title', type: 'text' },
          { name: 'company', label: 'Company Name', type: 'text' },
          { name: 'website', label: 'Website', type: 'url' },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block mb-2 font-medium">{label}</label>
            <input
              name={name}
              type={type}
              placeholder={`Enter ${label.toLowerCase()}`}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Describe the service"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            <option value="web-development">Web Development</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="consulting">Consulting</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price (USD)</label>
          <input
            type="number"
            name="price"
            min="0"
            placeholder="Enter price"
            required
            className="w-full px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email (read‑only) */}
        <div>
          <label className="block mb-2 font-medium">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={user?.email || ''}
            readOnly
            className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-500 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow transition"
        >
          Add Service
        </button>
      </form>

      {/* Reviews placeholder */}
      <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6">
        <h2 className="text-2xl font-semibold mb-4">Service Reviews</h2>
        <textarea
          placeholder="Reviews will be shown here. Writing reviews is disabled for now."
          disabled={reviewDisabled}
          rows="4"
          className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-500 cursor-not-allowed resize-none"
        />
        <p className="mt-2 text-sm text-gray-500 italic">
          Review writing is disabled initially and only shown here for demo
          purposes.
        </p>
      </div>
    </div>
  );
};

export default AddService;
