import { useState } from 'react';

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is a service store?',
      answer:
        'A service store is an online platform where digital or physical services are listed and offered to customers for marketing or purchase.',
    },
    {
      question: 'How can I promote my service online?',
      answer:
        'You can promote your service through various platforms like social media, SEO, email marketing, and online advertising.',
    },
    {
      question: 'Is it safe to buy services from your platform?',
      answer:
        'Yes, our platform ensures verified sellers and a secure payment system to keep your transactions safe.',
    },
    {
      question: 'Do you offer any customer support?',
      answer:
        'Absolutely! We offer 24/7 customer support via chat, email, and phone to assist you anytime.',
    },
    {
      question: 'Can I list my own services?',
      answer:
        'Yes, you can register as a seller and list your services easily through our seller dashboard.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-10 px-4 md:px-10 mt-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium text-lg focus:outline-none"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 transition-all duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
