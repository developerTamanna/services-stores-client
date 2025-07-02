import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import img1 from '../assets/contract-male-sunny-sand-career_1134-990.avif';
import img2 from '../assets/pngtree-customer-service-team-in-organized-call-center-image_16759863.jpg';
import img3 from '../assets/premium_photo-1666299884107-2c2cf920ee59.jpeg';

const banners = [
  {
    img: img1,
    title: 'Welcome to Our Service Review System',
    subtitle: 'Share Your Feedback with Us',
  },
  {
    img: img2,
    title: 'Rate & Review Trusted Services',
    subtitle: 'Join thousands of happy users',
  },
  {
    img: img3,
    title: 'Your Voice Matters!',
    subtitle: 'Help others by sharing your experience',
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  /* auto‑slide every 6s */
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((i) => (i + 1) % banners.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-64 md:h-[550px] overflow-hidden rounded-2xl shadow-xl ">
      <AnimatePresence>
        <motion.div
          key={current}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        >
          {/* background image */}
          <motion.img
            src={banners[current].img}
            alt="banner"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'linear' }} // subtle zoom effect
          />

          {/* overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          {/* text content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
              {banners[current].title}
            </h1>
            <p className="mt-3 text-sm sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0">
              {banners[current].subtitle}
            </p>
            <button className="inline-block mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition">
              Get Started
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Banner;
