import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaSearch,
  FaServer,
  FaShoppingCart,
} from 'react-icons/fa';

export default function WebsiteServices() {
  const services = [
    {
      icon: <FaLaptopCode />,
      title: 'Web Development',
      desc: 'Modern, responsive websites built with the latest technologies.',
    },
    {
      icon: <FaPaintBrush />,
      title: 'UI/UX Design',
      desc: 'Creative and user-friendly design for the best user experience.',
    },
    {
      icon: <FaSearch />,
      title: 'SEO Optimization',
      desc: "Improve your website's visibility and search engine ranking.",
    },
    {
      icon: <FaShoppingCart />,
      title: 'E-Commerce Solutions',
      desc: 'Custom online store with secure payment integration.',
    },
    {
      icon: <FaMobileAlt />,
      title: 'Mobile App Development',
      desc: 'Cross-platform apps for Android and iOS devices.',
    },
    {
      icon: <FaServer />,
      title: 'Hosting & Maintenance',
      desc: 'Fast, secure hosting and ongoing site maintenance.',
    },
  ];

  return (
    // <section className="bg-white dark:bg-black text-black dark:text-white py-16 px-4 md:px-10 mt-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
        Our Website Services
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition"
          >
            <div className="text-blue-600 text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {service.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
