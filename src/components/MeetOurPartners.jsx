// src/components/MeetOurPartners.jsx
import React from 'react';

const MeetOurPartners = () => {
  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-10 px-4 md:px-10 mt-10">
      <div className="text-center mb-10">
        <div className="relative my-10">
          {/* Thin full-width line */}
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Centered text */}
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-black px-4 text-2xl font-semibold">
              👥 Meet Our Partners
            </span>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          We proudly collaborate with outstanding partners who help us deliver
          quality services and support to our users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Partner 1 */}
        <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <img
            src="https://i.postimg.cc/2VGnmKsT/img5.jpg"
            alt="Partner 1"
            className="w-20 h-20 mx-auto mb-4 rounded-full"
          />
          <h3 className="text-xl font-semibold text-center text-black dark:text-white">
            TechWave Ltd.
          </h3>
          <p className="text-center mt-2 text-gray-600 dark:text-gray-400">
            Providing top-notch cloud infrastructure & dev support.
          </p>
        </div>

        {/* Partner 2 */}
        <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <img
            src="https://i.postimg.cc/jLtypbFL/user-data-person-full.webp"
            alt="Partner 2"
            className="w-20 h-20 mx-auto mb-4 rounded-full"
          />
          <h3 className="text-xl font-semibold text-center text-black dark:text-white">
            DesignCraft
          </h3>
          <p className="text-center mt-2 text-gray-600 dark:text-gray-400">
            Helping us build beautiful and user-friendly UI/UX design.
          </p>
        </div>

        {/* Partner 3 */}
        <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <img
            src="https://i.postimg.cc/F1jjCRGM/images.jpg"
            alt="Partner 3"
            className="w-20 h-20 mx-auto mb-4 rounded-full"
          />
          <h3 className="text-xl font-semibold text-center text-black dark:text-white">
            SecureNet Inc.
          </h3>
          <p className="text-center mt-2 text-gray-600 dark:text-gray-400">
            Ensuring security and authentication for our platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MeetOurPartners;
