import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import GiveReviews from './GiveReviews';
import './ReviewForm.css';

const consultations = [
  {
    serialNumber: 1,
    doctorName: 'Dr. John Doe',
    speciality: 'Cardiology',
  },
  {
    serialNumber: 2,
    doctorName: 'Dr. Jane Smith',
    speciality: 'Dermatology',
  },
];

const ReviewForm = () => {
  const [submittedDoctors, setSubmittedDoctors] = useState({});

  useEffect(() => {
    const initialState = {};
    consultations.forEach(({ serialNumber }) => {
      const key = `reviews_${serialNumber}`;
      const stored = JSON.parse(localStorage.getItem(key));
      if (stored && stored.length > 0) {
        initialState[serialNumber] = stored;
      }
    });
    setSubmittedDoctors(initialState);
  }, []);

  const handleReviewSubmitted = (serialNumber) => {
    const key = `reviews_${serialNumber}`;
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    setSubmittedDoctors((prev) => ({
      ...prev,
      [serialNumber]: stored,
    }));
  };

  return (
    <div className="review-form-container">
      <h2 className="review-title">Reviews</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Submitted Reviews</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map(({ serialNumber, doctorName, speciality }) => {
            const hasReview = submittedDoctors[serialNumber]?.length > 0;

            return (
              <tr key={serialNumber}>
                <td>{serialNumber}</td>
                <td>{doctorName}</td>
                <td>{speciality}</td>
                <td>
                  <Popup
                    trigger={
                      <button
                        className="feedback-button"
                        disabled={hasReview}
                      >
                        {hasReview ? 'Feedback Submitted' : 'Click Here'}
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <GiveReviews
                        doctorId={serialNumber}
                        closePopup={close}
                        onReviewSubmitted={() => handleReviewSubmitted(serialNumber)}
                      />
                    )}
                  </Popup>
                </td>
                <td>
                  {hasReview &&
                    submittedDoctors[serialNumber].map((r, idx) => (
                      <div key={idx} className="submitted-review">
                        <p><strong>{r.name}</strong>: {r.review} (⭐ {r.rating})</p>
                      </div>
                    ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;
