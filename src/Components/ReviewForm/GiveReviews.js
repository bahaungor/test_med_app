import React, { useState } from 'react';

function GiveReviews({ doctorId, closePopup, onReviewSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, review, rating } = formData;
    if (name && review && rating > 0) {
      setShowWarning(false);
      const key = `reviews_${doctorId}`;
      const existing = JSON.parse(localStorage.getItem(key)) || [];
      const updated = [...existing, formData];
      localStorage.setItem(key, JSON.stringify(updated));
      onReviewSubmitted(); // Notify parent to refresh
      if (closePopup) closePopup(); // Close popup
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-box">
      <h2>Give Your Feedback</h2>
      {showWarning && <p className="warning">Please fill out all fields.</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label>Review: </label>
          <textarea name="review" value={formData.review} onChange={handleChange} />
        </div>

        <div>
          <label>Rating:</label>
          <div style={{ display: 'flex', gap: '5px', fontSize: '1.5rem', cursor: 'pointer' }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                onClick={() => setFormData((prev) => ({ ...prev, rating: value }))}
                style={{
                  color: value <= formData.rating ? 'gold' : '#ccc',
                  transition: 'color 0.2s',
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default GiveReviews;
