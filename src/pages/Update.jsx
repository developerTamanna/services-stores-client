import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';

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
      .catch((error) => {
        // console.log(error);
        Swal.fire('you are not the service creator');
      });
  };

  if (!service)
    return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Service</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="image"
          defaultValue={service.image}
          className="w-full p-2 rounded bg-gray-800"
          placeholder="Image URL"
          required
        />
        <input
          name="title"
          defaultValue={service.title}
          className="w-full p-2 rounded bg-gray-800"
          placeholder="Title"
          required
        />
        <input
          name="company"
          defaultValue={service.company}
          className="w-full p-2 rounded bg-gray-800"
          placeholder="Company"
          required
        />
        <input
          name="website"
          defaultValue={service.website}
          className="w-full p-2 rounded bg-gray-800"
          placeholder="Website"
          required
        />
        <textarea
          name="description"
          defaultValue={service.description}
          className="w-full p-2 rounded bg-gray-800"
          placeholder="Description"
          rows="4"
          required
        />
        <select
          name="category"
          defaultValue={service.category}
          className="w-full p-2 rounded bg-gray-800"
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
          className="w-full p-2 rounded bg-gray-800"
          placeholder="Price"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default Update;
