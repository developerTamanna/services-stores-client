// src/components/WhyChooseUs.jsx
import { motion } from 'framer-motion';

const reasons = [
  {
    title: 'Verified Services',
    desc: 'All services are user‑verified and reviewed by real users.',
    icon: '✅',
  },
  {
    title: 'Trusted Reviews',
    desc: 'Each review is monitored to maintain trust and authenticity.',
    icon: '💬',
  },
  {
    title: 'User Friendly',
    desc: 'Clean, fast, and easy‑to‑use interface for all users.',
    icon: '🎯',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-10 px-4 md:px-10 mt-10">
      {/* শিরোনাম + ডিভাইডার */}
      <div className="relative mb-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-black px-4 text-2xl font-semibold">
            Why Choose Our Platform?
          </span>
        </div>
      </div>

      {/* কারণগুলোর গ্রিড */}
      <div className="grid md:grid-cols-3 gap-8 mt-10 md:mt-20">
        {reasons.map((item, i) => (
          <motion.div
            key={i}
            className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6
                       shadow-md hover:shadow-lg transition-all
                       border border-gray-200 dark:border-gray-600"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
