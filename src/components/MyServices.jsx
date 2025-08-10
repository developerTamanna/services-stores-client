import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';
import Loader from '../pages/Loader';

const MyServices = () => {
  useEffect(() => {
    document.title = 'My Services';
  }, []);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [myServices, setMyServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`https://services-code-server.vercel.app/services?userEmail=${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'unauthorize access') {
            setError('You are not authorized');
          } else {
            setMyServices(data);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    });
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This service will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://services-code-server.vercel.app/services/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Service has been deleted.', 'success');
              setMyServices((prev) => prev.filter((s) => s._id !== id));
            }
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Section Title */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-400 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-gray-900 px-6 text-2xl font-bold tracking-wide text-gray-800 dark:text-gray-100">
            My Added Services
          </span>
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <Loader />
      ) : myServices.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-medium text-gray-500 dark:text-gray-400 animate-pulse">
            🚫 No services added yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full border-collapse bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myServices.map((service, idx) => (
                <tr
                  key={service._id}
                  className={`border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                    idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-950' : ''
                  }`}
                >
                  <td className="py-2 px-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold">{service.title}</td>
                  <td className="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {service.description.length > 80
                      ? service.description.slice(0, 80) + '...'
                      : service.description}
                  </td>
                  <td className="py-2 px-4 font-medium text-green-600 dark:text-green-400">
                    ${service.price}
                  </td>
                  <td className="py-2 px-4">{service.userEmail}</td>
                  <td className="py-2 px-4 flex gap-3">
                    <button
                      onClick={() => handleUpdate(service._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md shadow-md transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md shadow-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyServices;
