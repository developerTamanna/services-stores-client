import { motion } from 'framer-motion';

const reasons = [
  {
    title: 'Verified Services',
    desc: 'All services are user-verified and reviewed by real users.',
    icon: '✅',
  },
  {
    title: 'Trusted Reviews',
    desc: 'Each review is monitored to maintain trust and authenticity.',
    icon: '💬',
  },
  {
    title: 'User Friendly',
    desc: 'Clean, fast, and easy-to-use interface for all users.',
    icon: '🎯',
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-black text-white py-16 px-4 md:px-10">
      <div className="relative my-10">
        {/* Thin full-width line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-500"></div>
        </div>

        {/* Centered text */}
        <div className="relative flex justify-center">
          <span className="bg-black px-4 text-2xl font-semibold text-white">
            Why Choose Our Platforms?
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((item, i) => (
          <motion.div
            key={i}
            className="bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-600"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
