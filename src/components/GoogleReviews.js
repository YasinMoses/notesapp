import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleReviews = ({ placeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=reviews&key=YOUR_API_KEY`
        );
        const fetchedReviews = response.data.result.reviews;
        setReviews(fetchedReviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Google Reviews', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Google Reviews</h2>
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="border-b pb-4">
              <p className="text-gray-700 font-semibold">{review.author_name}</p>
              <p className="text-sm text-gray-600">{review.text}</p>
              <p className="text-sm text-yellow-500">Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default GoogleReviews;
