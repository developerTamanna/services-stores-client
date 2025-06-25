import { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';
import Loader from '../pages/Loader';

const MyReviews = () => {
  useEffect(() => {
    document.title = 'myReviews';
  }, []);

  const { user } = use(AuthContext);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://services-code-server.vercel.app/myReviews?userEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((services) => {
          const allReviews = [];
          services.forEach((service) => {
            service.reviews?.forEach((rev) => {
              if (rev.userEmail === user.email) {
                allReviews.push({
                  ...rev,
                  serviceId: service._id,
                  serviceTitle: service.title,
                });
              }
            });
          });
          setMyReviews(allReviews);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (serviceId, reviewDate) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this review!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://services-code-server.vercel.app/services/${serviceId}/delete-review`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify({ reviewDate }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
              setMyReviews((prev) =>
                prev.filter(
                  (rev) =>
                    rev.serviceId !== serviceId || rev.date !== reviewDate
                )
              );
            }
          });
      }
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newText = form.text.value;
    const newRating = parseInt(form.rating.value);

    fetch(
      `https://services-code-server.vercel.app/services/${editingReview.serviceId}/reviews`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          reviewDate: editingReview.date,
          newText,
          newRating,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire('Updated!', 'Your review has been updated.', 'success');
          setMyReviews((prev) =>
            prev.map((rev) =>
              rev.serviceId === editingReview.serviceId &&
              rev.date === editingReview.date
                ? { ...rev, text: newText, rating: newRating }
                : rev
            )
          );
          setEditingReview(null);
        }
      });
  };

  if (loading) return <Loader></Loader>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-900 text-white rounded-lg">
      <div className="relative my-10">
        {/* Thin full-width line */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-500"></div>
        </div>

        {/* Centered text */}
        <div className="relative flex justify-center">
          <span className="bg-gray-900 px-4 text-2xl font-semibold text-white">
            My Added Reviews
          </span>
        </div>
      </div>

      {myReviews.length === 0 ? (
        <p>No reviews found!</p>
      ) : (
        myReviews.map((rev, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded mb-4 shadow">
            <h3 className="text-xl font-semibold">{rev.serviceTitle}</h3>
            <p className="text-yellow-400">Rating: {rev.rating} ⭐</p>
            <p className="mt-1">{rev.text}</p>
            <p className="text-sm text-gray-400 mt-1">
              Posted on: {new Date(rev.date).toLocaleDateString()}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setEditingReview(rev)}
                className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(rev.serviceId, rev.date)}
                className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Update Review</h2>
            <form onSubmit={handleUpdateSubmit}>
              <textarea
                name="text"
                defaultValue={editingReview.text}
                className="w-full p-2 border rounded mb-3"
                rows="3"
                required
              />
              <select
                name="rating"
                defaultValue={editingReview.rating}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="5">🌟🌟🌟🌟🌟 (5)</option>
                <option value="4">🌟🌟🌟🌟 (4)</option>
                <option value="3">🌟🌟🌟 (3)</option>
                <option value="2">🌟🌟 (2)</option>
                <option value="1">🌟 (1)</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="bg-gray-400 text-black px-4 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
