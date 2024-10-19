import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth'; // Adjust the path as necessary
import 'maplibre-gl/dist/maplibre-gl.css';

const CampaignModal = ({ campaign, onClose }) => {
  const { user } = useAuth(); // Access user from AuthContext
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null); // To handle error messages

  const handleDonationClick = () => {
    setShowDonationModal(true);
  };

  const handleDonate = async () => {
    if (!name || !amount) {
      setError('Please enter both name and amount.');
      return;
    }

    const donationAmount = parseFloat(amount) * 100; // Convert INR to paise

    if (donationAmount > 1000000000) { // Check if amount exceeds Razorpay limit
      setError('Amount exceeds maximum allowed limit.');
      return;
    }

    try {
      // Step 1: Create an order in the backend
      const { data } = await axios.post('http://localhost:5000/orders', {
        amount: donationAmount, // amount in paise
        currency: 'INR',
      });
      const { order_id } = data; // Get order_id from response

      // Step 2: Open Razorpay payment UI
      const options = {
        key: 'rzp_test_GcZZFDPP0jHtC4', // Razorpay test key
        amount: donationAmount,
        currency: 'INR',
        name: name,
        description: `Donation to ${campaign.name}`,
        order_id: order_id,
        handler: async function (response) {
          try {
            // Step 3: Verify payment
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            await axios.post('http://localhost:5000/verify', verificationData);
            alert('Donation successful and payment verified!');
            setShowDonationModal(false);
            onClose(); // Close modal after successful donation
          } catch (error) {
            console.error('Error verifying payment:', error);
            setError('Payment verification failed.');
          }
        },
        prefill: {
          name: name,
          email: user.email, // Prefill user email
        },
        theme: {
          color: '#3399cc', // Custom theme color for Razorpay UI
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open(); // Open Razorpay modal for payment
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      setError('Failed to initiate donation.');
    }
  };

  return (
    <div className="modal-overlay">
      {!showDonationModal ? (
        <div className="modal-content">
          <h2>{campaign.name}</h2>
          {/* Display campaign details */}
          <button className="donate-btn" onClick={handleDonationClick}>
            Donate
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      ) : (
        <div className="modal-content">
          <h2>Donate to {campaign.name}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <input
            type="text"
            placeholder="Your Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
          />
          <input
            type="number"
            placeholder="Amount (INR)"
            className="input-field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)} // Update amount state
          />
          <button className="donate-btn" onClick={handleDonate}>
            Donate
          </button>
          <button className="close-btn" onClick={() => setShowDonationModal(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignModal;
