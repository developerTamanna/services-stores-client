import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const banners = [
  {
    img: 'https://i.postimg.cc/K3kcVRhd/premium-photo-1666299884107-2c2cf920ee59.jpg',
    title: 'Welcome to Our Service Review System',
    subtitle: 'Share Your Feedback with Us',
  },
  {
    img: 'https://i.postimg.cc/xJFTtLhv/pngtree-customer-service-team-in-organized-call-center-image-16759863.jpg',
    title: 'Rate & Review Trusted Services',
    subtitle: 'Join thousands of happy users',
  },
  {
    img: 'https://i.postimg.cc/gX02VgSc/contract-male-sunny-sand-career-1134-990.avif',
    title: 'Your Voice Matters!',
    subtitle: 'Help others by sharing your experience',
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[420px] bg-black overflow-hidden rounded-xl">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className="absolute w-full h-full flex flex-col md:flex-row items-center justify-center p-6"
        >
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow">
              {banners[current].title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              {banners[current].subtitle}
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-orange-600 text-white font-semibold rounded-lg">
              Get Started
            </button>
          </div>
          <motion.img
            src={banners[current].img}
            alt="banner"
            className="w-60 md:w-[400px] rounded-lg shadow-lg md:ml-10 mt-6 md:mt-0"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Banner;
