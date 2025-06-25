import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {
  useEffect(() => {
    document.title = 'Services';
  }, []);

  const allServices = useLoaderData();
  console.log(allServices)
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

 //uniq category
  const categories = [...new Set(allServices.map((s) => s.category))];

 //filter and search
  const filteredServices = allServices.filter((service) => {
    const matchesCategory = categoryFilter
      ? service.category === categoryFilter
      : true;
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.company &&
        service.company.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 max-w-7xl mx-auto">
      <div className="relative my-10">
        {/* Thin full-width line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-500"></div>
        </div>

        {/* Centered text */}
        <div className="relative flex justify-center">
          <span className="bg-black px-4 text-2xl font-semibold text-white">
            All Services
          </span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search by title, category, or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 rounded border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServicesCard key={service._id} service={service} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No services found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default Services;
