import { useEffect, useState } from 'react';
import { Link } from 'react-router'; // ✅ এটি হওয়া উচিত react-router-dom
import Loader from '../pages/Loader';

const FeaturedSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://services-code-server.vercel.app/featured-services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading services:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white py-10 px-4 md:px-10 md:mt-10 mt-4">
      <div className="relative my-10">
        {/* Thin full-width line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Centered text */}
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-black px-4 text-2xl font-semibold text-black dark:text-white">
            Featured Services
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 md:mt-20">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg p-5 hover:scale-105 duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-40 object-contain rounded-md mb-4 mt-2"
            />
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
              {service.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {service.description}
            </p>
            <p className="text-green-700 dark:text-green-400 font-bold mb-4">
              ${service.price}
            </p>

            <Link
              to={`/details/${service._id}`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
