import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const CountupSection = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    serviceCount: 0,
    reviewCount: 0,
  });

  useEffect(() => {
    fetch('https://services-code-server.vercel.app/stats')
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div className="bg-gray-900 text-white py-12 px-6 mt-10">
      <div className="relative my-10">
        {/* Thin full-width line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-500"></div>
        </div>

        {/* Centered text */}
        <div className="relative flex justify-center">
          <span className="bg-gray-900 px-4 text-2xl font-semibold text-white">
            Platform Stats
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-5xl font-bold text-green-400">
            <CountUp end={stats.userCount} duration={2} />
          </h3>
          <p className="mt-2 text-lg">Total Users</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold text-yellow-400">
            <CountUp end={stats.reviewCount} duration={2} />
          </h3>
          <p className="mt-2 text-lg">Total Reviews</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold text-blue-400">
            <CountUp end={stats.serviceCount} duration={2} />
          </h3>
          <p className="mt-2 text-lg">Total Services</p>
        </div>
      </div>
    </div>
  );
};

export default CountupSection;
