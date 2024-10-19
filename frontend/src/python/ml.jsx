import React, { useState } from 'react';
import './VolunteerForm.css'; // Make sure to import your CSS file
import axios from 'axios'; // Import axios for making HTTP requests
import 'maplibre-gl/dist/maplibre-gl.css';
import Navbar from '../components/Navbar/Navbar';

// NGO Data Generator
const generateNgos = (count) => {
  const projectTypes = ["Education", "Healthcare", "Environment", "Animal Welfare", "Community Development", "Disaster Relief"];
  const cities = [
    "Agra", "Ahmedabad", "Bangalore", "Bhopal", "Bhubaneswar", "Chennai",
    "Chandigarh", "Coimbatore", "Delhi", "Faridabad", "Gandhinagar", "Ghaziabad",
    "Gurgaon", "Hyderabad", "Indore", "Jaipur", "Jodhpur", "Kolkata", "Lucknow",
    "Mumbai", "Nagpur", "Nashik", "Patna", "Pune", "Raipur", "Ranchi", "Surat",
    "Thane", "Vadodara", "Varanasi", "Visakhapatnam"
  ];

  const ngoNames = [
    "Save the World", "Attarde Aashram", "Doctors Without Borders", "World Wildlife Fund",
    "Oxfam India", "Teach for India", "Akshaya Patra", "CRY", "Goonj", "Pratham Foundation"
  ];

  let ngos = [];
  for (let i = 0; i < count; i++) {
    const ngo = {
      name: ngoNames[Math.floor(Math.random() * ngoNames.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      project: projectTypes[Math.floor(Math.random() * projectTypes.length)],
      required_time: Math.floor(Math.random() * 20) + 1  // Random time between 1 and 20 hours
    };
    ngos.push(ngo);
  }
  return ngos;
};

// Pre-generated NGO dataset
const ngos = generateNgos(200);

// Dropdown options for skills
const skillOptions = ["", "Education", "Healthcare", "Environment", "Animal Welfare", "Community Development", "Disaster Relief", "AI Recommended"];

const MlForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    city: '',
    skills: '',
    available_time: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const cities = [
    "Agra", "Ahmedabad", "Bangalore", "Bhopal", "Bhubaneswar", "Chennai",
    "Chandigarh", "Coimbatore", "Delhi", "Faridabad", "Gandhinagar", "Ghaziabad",
    "Gurgaon", "Hyderabad", "Indore", "Jaipur", "Jodhpur", "Kolkata", "Lucknow",
    "Mumbai", "Nagpur", "Nashik", "Patna", "Pune", "Raipur", "Ranchi", "Surat",
    "Thane", "Vadodara", "Varanasi", "Visakhapatnam"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'city') {
      // Filter cities based on user input
      const matchingCities = cities.filter(city => city.toLowerCase().startsWith(value.toLowerCase()));
      setFilteredCities(matchingCities);
    }
  };

  const filterNgos = (skills) => {
    let filteredNgos = ngos;

    const { city, available_time } = formData;

    // If city is provided, filter by city
    if (city) {
      filteredNgos = filteredNgos.filter(ngo => ngo.city === city);
    }

    // If skills are provided, filter by project type (skills)
    if (skills) {
      filteredNgos = filteredNgos.filter(ngo => ngo.project === skills);
    }

    // If available time is provided, filter by time
    if (available_time) {
      const timeInt = parseInt(available_time, 10);
      filteredNgos = filteredNgos.filter(ngo => ngo.required_time <= timeInt);
    }

    filteredNgos.sort((a, b) => a.required_time - b.required_time);

    return filteredNgos;
  };

  const handleCitySelect = (city) => {
    setFormData({ ...formData, city });
    setFilteredCities([]); // Clear suggestions after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setRecommendations([]);

    const { skills } = formData;

    // If "AI Recommended" is selected, call the ML API
    if (skills === "AI Recommended") {
      try {
        const response = await axios.post('http://localhost:5002/recommend_organization', {
          age: formData.age,
          gender: formData.gender
        });

        const recommendedSkill = response.data.recommended_organization;

        // Filter NGOs based on the recommended skill
        const filteredNgos = filterNgos(recommendedSkill);

        if (filteredNgos.length === 0) {
          setRecommendations([{ name: 'No NGO matches your criteria.' }]);
        } else {
          setRecommendations(filteredNgos); // Set recommended NGOs
        }
      } catch (error) {
        setError('Error fetching recommendations. Please try again.');
      }
    } else {
      // Get filtered NGOs based on inputs without AI
      const filteredNgos = filterNgos(skills);

      if (filteredNgos.length === 0) {
        setRecommendations([{ name: 'No NGO matches your criteria.' }]);
      } else {
        setRecommendations(filteredNgos); // Set recommended NGOs
      }
    }
  };

  return (
    <div className="volunteer-form-container">
      <Navbar/>
      <h2>NGO's Project Recommendation System </h2>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>Age (18-38):</label>
          <input 
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter your age"
            min="18"
            max="38"
            className="age-input" // Add this class for styling
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleInputChange}
            className="gender-input" // Add this class for styling
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>City:</label>
          <input 
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Type a city..."
            className="city-input" // Add this class for styling
          />
          {filteredCities.length > 0 && (
            <ul className="city-suggestions">
              {filteredCities.map((city, index) => (
                <li 
                  key={index} 
                  onClick={() => handleCitySelect(city)} 
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="form-group">
          <label>Project Sectors:</label>
          <select name="skills" value={formData.skills} onChange={handleInputChange}>
            {skillOptions.map((skill, index) => (
              <option key={index} value={skill}>{skill || "Select a skill"}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Available Time (in hours):</label>
          <input
            type="number"
            name="available_time"
            value={formData.available_time}
            onChange={handleInputChange}
            className="time-input" // Add this class for styling
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/* Display Recommendations */}
      <div className="recommendations">
        <h3>Recommendations</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul className="recommendation-cards">
          {recommendations.map((ngo, index) => (
            <li key={index} className="ngo-card">
              <div className="ngo-name">{ngo.name}</div>
              <div className="ngo-project">Project Type: {ngo.project}</div>
              <div className="ngo-city">City: {ngo.city}</div>
              <div className="ngo-time">Required Time: {ngo.required_time} hours</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MlForm;
