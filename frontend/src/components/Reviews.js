import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    guest_name: '',
    rating: 5,
    comment: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await apiService.getReviews();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback data
      setReviews([
        { id: 1, guest_name: 'John M.', rating: 5, comment: 'Amazing experience! The views of Mount Kenya are breathtaking.', created_at: '2024-01-15' },
        { id: 2, guest_name: 'Sarah K.', rating: 4, comment: 'Beautiful hotel with excellent service. The staff was very friendly and helpful.', created_at: '2024-01-10' },
        { id: 3, guest_name: 'David O.', rating: 5, comment: 'Perfect getaway destination. The rooms are spacious and clean. Will definitely come back!', created_at: '2024-01-05' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.submitReview(formData);
      setMessage('Thank you for your review!');
      setFormData({ guest_name: '', rating: 5, comment: '' });
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      setMessage('Error submitting review. Please try again.');
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <section id="reviews" className="section">
        <div className="container">
          <h2>Guest Reviews</h2>
          <p>Loading reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="reviews" className="section">
      <div className="container">
        <h2>Guest Reviews</h2>

        <button 
          className="btn" 
          onClick={() => setShowForm(!showForm)}
          style={{ marginBottom: '30px' }}
        >
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
            <h3>Share Your Experience</h3>
            <label>Your Name *</label>
            <input
              type="text"
              name="guest_name"
              value={formData.guest_name}
              onChange={handleChange}
              required
            />

            <label>Rating *</label>
            <select name="rating" value={formData.rating} onChange={handleChange} required>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>

            <label>Your Review *</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="4"
              required
            />

            {message && (
              <div className={message.includes('Error') ? 'error' : 'success'}>
                {message}
              </div>
            )}

            <button type="submit" className="btn">Submit Review</button>
          </form>
        )}

        <div className="grid">
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to share your experience!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="card">
                <div style={{ color: '#8b5e3c', fontSize: '1.5rem', marginBottom: '10px' }}>
                  {renderStars(review.rating)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"{review.comment}"</p>
                <p><strong>- {review.guest_name}</strong></p>
                {review.created_at && (
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Reviews;