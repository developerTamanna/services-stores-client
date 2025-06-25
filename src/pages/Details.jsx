import { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';

const Details = () => {
  useEffect(() => {
    document.title = 'service|| Details';
  }, []);

  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const { user } = use(AuthContext);

  // Load Service by ID
  useEffect(() => {
    fetch(`https://services-code-server.vercel.app/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [id]);

  // Handle Review Submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      return Swal.fire(
        'Login Required',
        'Please login to submit a review.',
        'warning'
      );
    }

    const review = {
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      rating,
      text: reviewText,
      date: new Date(),
    };

    fetch(`https://services-code-server.vercel.app/services/${id}/review`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.acknowledged) {
          Swal.fire('Success!', 'Review submitted successfully!', 'success');
          setService((prev) => ({
            ...prev,
            reviews: [...(prev.reviews || []), review],
          }));
          setReviewText('');
          setRating(5);
        }
      });
  };

  if (!service)
    return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-gray-900 text-white rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-64 object-contain mb-4"
      />
      <p className="mb-2">{service.description}</p>
      <p className="text-green-400 font-bold mb-6">${service.price}</p>

      {/* --- Add Review Form --- */}
      <form onSubmit={handleReviewSubmit} className="mb-8 space-y-4">
        <textarea
          className="w-full p-3 rounded bg-gray-800"
          rows="4"
          placeholder="Write your review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-800"
        >
          <option value="5">🌟🌟🌟🌟🌟 (5)</option>
          <option value="4">🌟🌟🌟🌟 (4)</option>
          <option value="3">🌟🌟🌟 (3)</option>
          <option value="2">🌟🌟 (2)</option>
          <option value="1">🌟 (1)</option>
        </select>
        <button className="bg-green-600 py-2 px-4 rounded hover:bg-green-700">
          Submit Review
        </button>
      </form>

      {/* --- Show All Reviews --- */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">
          Reviews ({service.reviews?.length || 0})
        </h3>
        {service.reviews?.map((rev, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded mb-3">
            <div className="flex items-center mb-2">
              <img
                src={rev.userPhoto}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{rev.userName}</p>
                <p className="text-xs text-gray-400">
                  {new Date(rev.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="mb-1 text-yellow-400">Rating: {rev.rating} ⭐</p>
            <p>{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
