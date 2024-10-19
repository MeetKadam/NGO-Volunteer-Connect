import React, { useEffect, useState } from 'react';
import './Modal.css'; // Optional: import your CSS for the modal
import axios from 'axios';

const Modal = ({ isOpen, onClose }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (isOpen) {
        setLoading(true);
        setError(null);
        try {
          // Fetch all registrations
          const response = await axios.get('http://localhost:5000/api/regis/getAllRegistrations');
          // Update the registrations state to reflect the correct structure
          setRegistrations(response.data.registrations); // Accessing the registrations array directly
        } catch (error) {
          console.error("Error fetching registrations:", error);
          setError("Failed to fetch registrations.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRegistrations();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Total Registrations: {registrations.length}</h2>
        <button onClick={onClose} className="close-button">Close</button>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : registrations.length > 0 ? (
          <div className="registrations-list">
            {registrations.map((registration) => (
              <div key={registration._id} className="registration-item">
                <p><strong>Name:</strong> {registration.name}</p>
                <p><strong>Email:</strong> {registration.email}</p>
                <p><strong>Number:</strong> {registration.phone}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No registrations found.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
