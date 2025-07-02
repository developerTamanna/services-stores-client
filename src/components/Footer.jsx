import { Link } from 'react-router'; // react-router-dom হবে

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            ServiceReview
          </h2>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
            Your trusted platform to share and explore reviews on various
            services. We helpp you make better decisions..
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                All Services
              </Link>
            </li>
            <li>
              <Link
                to="/addService"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Add Service
              </Link>
            </li>
            <li>
              <Link
                to="/myReviews"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                My Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact or Copyright */}
        <div>
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
            Contact
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Email: support@servicereview.com
            <br />
            Phone: +880-1234-567890
          </p>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ServiceReview. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
