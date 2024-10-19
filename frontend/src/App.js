import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SignUpIn from './Pages/SignUpIn';
import NGOSignInUp from './Pages/NGOSignInUp';
import VolunteerSignInUp from './Pages/VolunteerSignInUp';
import NGOMap from './Pages/NGOMap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Pages/Dashboard';
import { Logout } from './Pages/Logout';
import NgoDash from './Pages/NgoDash';
import NgoCards from './Pages/NGOCards';
import Campaigns from './Pages/Campaigns';
import Review from './Pages/review';
import FeedbackForm from './Pages/Feedback';
import LiveStream from './Pages/LiveStream';
import MlForm from './python/ml';
import Community from './Pages/Community';
import ContentGenerator from './ContentGenerator';
import External from './Pages/External';
import GoogleTranslate from './components/GoogleTranslate';
import Chatbot from './Pages/Chatbot';

function App() {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get('/path/to/your/response.json'); // Change the path to your actual data
        setNgos(response.data);
      } catch (error) {
        console.error('Error fetching NGO data:', error);
      }
    };

    fetchNgos();
  }, []);

  const city = {
    lat: 40.7128, // Example: New York City Latitude
    lng: -74.0060 // Example: New York City Longitude
  };
  return (
    <div>
      <BrowserRouter>
      <GoogleTranslate/>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signupin' element={<SignUpIn />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/ngo/NGOLogin' element={<NGOSignInUp />} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/Volunteer/VolunteerSignInUp' element={<VolunteerSignInUp />} />
          <Route path='/about' element={<About />} />
          <Route path='/events' element={<NgoCards />} />
          <Route path="/ngo/NGOMap" element={<NGOMap city={city} ngos={ngos} />} />
          <Route path='/dashboard' element={<NgoDash/>}/>
          <Route path='/donation' element={<Campaigns/>}/>
          <Route path='/review' element={<Review/>}/>
          <Route path='/feedback' element={<FeedbackForm/>}/>
          <Route path='/live' element={<LiveStream/>}/>
          <Route path='/ml' element={<MlForm/>}/>
          <Route path='/community' element={<Community/>}/>
          <Route path='/posts' element={<External/>}/>


          {/* http://localhost:3001/ */}
        





        </Routes>
        <Chatbot/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
