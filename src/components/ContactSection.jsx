// src/components/ContactSection.jsx
const ContactSection = () => {
  return (
    <section
      className="bg-white dark:bg-black text-black dark:text-white max-w-3xl mx-auto rounded-lg shadow-lg py-10 px-4 md:px-10 mt-20"
    >
      {/* শিরোনাম + ডিভাইডার */}
      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-black px-4 text-2xl font-semibold">
            Contact&nbsp;Us
          </span>
        </div>
      </div>

      <form className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-md
                       bg-gray-100 dark:bg-gray-900
                       border border-gray-300 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-black dark:text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 rounded-md
                       bg-gray-100 dark:bg-gray-900
                       border border-gray-300 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-black dark:text-white"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block mb-2 font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Write your message here..."
            required
            className="w-full px-4 py-3 rounded-md
                       bg-gray-100 dark:bg-gray-900
                       border border-gray-300 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       text-black dark:text-white resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3
                     rounded-md font-semibold text-white"
        >
          Send&nbsp;Message
        </button>
      </form>
    </section>
  );
};

export default ContactSection;
