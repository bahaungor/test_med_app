import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [isAppointmentCanceled, setIsAppointmentCanceled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Retrieve stored user and appointment info
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true); // Show notification if appointment exists
    }
  }, []);

  // Effect to listen for appointment cancellation
  useEffect(() => {
    if (isAppointmentCanceled) {
      setShowNotification(false); // Hide notification on cancellation
    }
  }, [isAppointmentCanceled]);

  // Handler to simulate appointment cancellation (could be from a button or event)
  const handleCancelAppointment = () => {
    setIsAppointmentCanceled(true);
    // Optionally, remove appointment data from localStorage or update accordingly
    localStorage.removeItem(doctorData?.name);
    setAppointmentData(null);
  };

  return (
    <div>
      <Navbar />
      {children}

      {/* Notification container with conditional rendering */}
      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p><strong>User:</strong> {username}</p>
              <p><strong>Doctor:</strong> {doctorData?.name}</p>
              <p><strong>Date:</strong> {appointmentData.date}</p>
              <p><strong>Time:</strong> {appointmentData.time}</p>

              {/* Add a cancel button to test cancellation */}
              <button className="cancel-btn" onClick={handleCancelAppointment}>
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
