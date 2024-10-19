import React, { useState,useEffect } from "react";
import axios from "axios";
import "../thirdSectionContact/thirdSectionContact.css";
import { useAuth } from '../../../../store/auth';

const ThirdSectionContact = () => {
  const { user } = useAuth(); // Access the authenticated user
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: ""
  });
  const [responseMessage, setResponseMessage] = useState('');

  // Prefill form data with user information if the user is logged in
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",  // Use user data if available
        email: user.email || "",
        message: ""
      });
    }
  }, [user]);  // Run this effect only when the user data is available

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/form/contact', formData);
      setResponseMessage(response.data.msg);
      alert('Message sent successfully!');
    } catch (error) {
      setResponseMessage('Error sending message. Please try again.');
      alert('Failed to send the message. Please try again.');
    }
  };

  return (
    <div className="contact-third-section">
      <div className="contact-third-container">
        <div className="contact-third-upper-container">
          <h2>Have Any Questions?</h2>
          <h4>
            It is a long established fact that a reader will be distracted
            content of a page when looking.
          </h4>
        </div>
        <div className="contact-third-lower-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Name"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              <button type="submit" id="submit-btn">
                Send Message
              </button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdSectionContact;