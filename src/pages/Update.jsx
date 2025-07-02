import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'; // ← react-router-dom
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';
import Loader from './Loader';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://services-code-server.vercel.app/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedService = {
      image: form.image.value,
      title: form.title.value,
      company: form.company.value,
      website: form.website.value,
      description: form.description.value,
      category: form.category.value,
      price: form.price.value,
    };

    fetch(`https://services-code-server.vercel.app/services/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify(updatedService),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire('Success', 'Service updated successfully', 'success');
          navigate('/myServices');
        }
      })
      .catch(() =>
        Swal.fire('Oops', 'You are not the service creator', 'error')
      );
  };

  if (!service) return <Loader></Loader>;

  return (
    <div className="max-w-xl mx-auto p-8 mt-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Service</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/*
          প্রতিটি ইনপুট/সিলেক্টে একই স্টাইল:
          - লাইটে হালকা গ্রে ব্যাকগ্রাউন্ড ও বর্ডার
          - ডার্কে গাঢ় ব্যাকগ্রাউন্ড ও বর্ডার
        */}
        <input
          name="image"
          defaultValue={service.image}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          placeholder="Image URL"
          required
        />

        <input
          name="title"
          defaultValue={service.title}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          placeholder="Title"
          required
        />

        <input
          name="company"
          defaultValue={service.company}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          placeholder="Company"
          required
        />

        <input
          name="website"
          defaultValue={service.website}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          placeholder="Website"
          required
        />

        <textarea
          name="description"
          defaultValue={service.description}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          placeholder="Description"
          rows="4"
          required
        />

        <select
          name="category"
          defaultValue={service.category}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          required
        >
          <option value="">Select Category</option>
          <option value="web-development">Web Development</option>
          <option value="graphic-design">Graphic Design</option>
          <option value="digital-marketing">Digital Marketing</option>
          <option value="consulting">Consulting</option>
        </select>

        <input
          type="number"
          name="price"
          defaultValue={service.price}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          placeholder="Price"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 rounded shadow"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default Update;
