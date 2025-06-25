import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';
import Loader from '../pages/Loader';

const MyServices = () => {
  useEffect(() => {
    document.title = 'myServices';
  }, []);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext);
  console.log('token in te context', user.accessToken);
  const [myServices, setMyServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(
        `https://services-code-server.vercel.app/services?userEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'unauthorize access') {
            console.log('invalid token');
            setError('you are not authorized');
          } else setMyServices(data);
          setLoading(false);
          // console.log(data);
        })

        .catch((error) => {
          console.log(error);
          setLoading(false)
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
    <div className="max-w-6xl mx-auto px-4 py-10 ">
      <div className="relative my-10">
        {/* Thin full-width line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-500"></div>
        </div>

        {/* Centered text */}
        <div className="relative flex justify-center">
          <span className="bg-gray-900 px-4 text-2xl font-semibold text-white">
            My Added Services
          </span>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : myServices.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-400 dark:text-gray-500 animate-pulse">
              🚫 No services added yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white rounded-md">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myServices.map((service) => (
                <tr key={service._id} className="border-b border-gray-800">
                  <td className="py-2 px-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-20 h-20 object-contain rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{service.title}</td>
                  <td className="py-2 px-4">
                    {service.description.length > 80
                      ? service.description.slice(0, 80) + '...'
                      : service.description}
                  </td>
                  <td className="py-2 px-4">${service.price}</td>
                  <td className="py-2 px-4">{service.userEmail}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleUpdate(service._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
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
