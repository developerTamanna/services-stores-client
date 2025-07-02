import { Link } from 'react-router'; // react-router-dom ইউজ করবে

const ServicesCard = ({ service }) => {
  const { _id, image, title, description, category, price } = service;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain rounded-md mt-2"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
          {description}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span className="font-semibold">Category:</span> {category}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="font-semibold">Price:</span> ${price}
        </p>
        <Link
          to={`/details/${_id}`}
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
