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
    <section className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white py-10 px-4 md:px-10 mt-20">
      {/* শিরোনাম + ডিভাইডার */}
      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-50 dark:bg-gray-900 px-4 text-2xl font-semibold">
            Platform&nbsp;Stats
          </span>
        </div>
      </div>

      {/* কাউন্ট-আপ সংখ্যা */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-5xl font-bold text-green-600 dark:text-green-400">
            <CountUp end={stats.userCount} duration={2} />
          </h3>
          <p className="mt-2 text-lg">Total&nbsp;Users</p>
        </div>

        <div>
          <h3 className="text-5xl font-bold text-yellow-500 dark:text-yellow-400">
            <CountUp end={stats.reviewCount} duration={2} />
          </h3>
          <p className="mt-2 text-lg">Total&nbsp;Reviews</p>
        </div>

        <div>
          <h3 className="text-5xl font-bold text-blue-600 dark:text-blue-400">
            <CountUp end={stats.serviceCount} duration={2} />
          </h3>
          <p className="mt-2 text-lg">Total&nbsp;Services</p>
        </div>
      </div>
    </section>
  );
};

export default CountupSection;
