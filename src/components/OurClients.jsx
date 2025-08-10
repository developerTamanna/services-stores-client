// src/components/OurClients.jsx
import React from 'react';

const OurClients = () => {
  const clients = [
    {
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    },
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    },
    {
      name: 'Spotify',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    },
    {
      name: 'Netflix',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
    },
    {
      name: 'Adobe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Adobe_Corporate_Logo.png',
    },
  ];

  // return (
  //   <section className="bg-white dark:bg-black text-black dark:text-white py-16 px-4 md:px-10 mt-16 transition-colors duration-300">
  //     <div className="text-center mb-10">
  //       <div className="relative my-10">
  //         {/* Thin full-width line */}
  //         <div
  //           className="absolute inset-0 flex items-center"
  //           aria-hidden="true"
  //         >
  //           <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
  //         </div>

  //         {/* Centered text */}
  //         <div className="relative flex justify-center">
  //           <span className="bg-white dark:bg-black px-4 text-2xl font-semibold">
  //             🤝 Our Clients
  //           </span>
  //         </div>
  //       </div>

  //       <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
  //         Trusted by leading brands and companies around the world.
  //       </p>
  //     </div>

  //     {/* Clients Logo Grid */}
  //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
  //       {clients.map((client, index) => (
  //         <div
  //           key={index}
  //           className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 rounded-xl p-4 shadow-md hover:shadow-lg transition"
  //         >
  //           <img
  //             src={client.logo}
  //             alt={client.name}
  //             className="h-10 object-contain"
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   </section>
  // );
};

export default OurClients;
