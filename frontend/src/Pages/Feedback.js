import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios'; // Import axios for making HTTP requests
import './Feedback.css';
import Navbar from '../components/Navbar/Navbar';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [projectType, setProjectType] = useState('');
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hash the name for anonymity
        const salt = await bcrypt.genSalt(10);
        const hashedName = await bcrypt.hash(name, salt);

        // Prepare the data to send to the backend
        const feedbackData = {
            name: hashedName, // Use the hashed name
            type: projectType,
            message: feedback,
        };

        try {
            // Send POST request to the backend API
            const response = await axios.post('http://localhost:5000/api/feedback', feedbackData);
            console.log(response.data); // Log the response from the server
            // Reset the form fields
            setName('');
            setProjectType('');
            setFeedback('');
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    return (
        <div className="form-container">
            <Navbar/>
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Volunteer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Project Type</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Environment">Environment</option>
                    <option value="AnimalWelfare">Animal Welfare</option>
                    <option value="CommunityDevelopment">Community Development</option>
                    <option value="DisasterRelief">Disaster Relief</option>
                </select>
                <textarea
                    placeholder="Your Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                ></textarea>
                <button id="submit-btn" type="submit">Submit Feedback</button>
            </form>
            {submitted && <p>Thank you for your feedback!</p>}
        </div>
    );
};

export default FeedbackForm;
