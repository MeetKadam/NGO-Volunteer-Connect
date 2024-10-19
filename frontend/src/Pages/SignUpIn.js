import React from 'react';
import '../Styles/SignUpIn.css'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const SignUpIn = () => {
  return (
    <>
    <Navbar/>
      <div className="contain">
        <div className="container" >

          <h2>Access NGO Portal</h2>
          <p>Join our mission to transform lives and build a better future. Log in to access essential resources, monitor initiatives, and collaborate with a global network of changemakers working towards a more just and sustainable world.</p>
          <Link to={'/ngo/NGOLogin'}><button className='btn1'>SignUp & Assign</button></Link>
          
        </div>
        <div className="container" >
          <h2>Volunteer with Us</h2>
          <p>Join over 1 million volunteers, participate and complete the task. We are changemakers who change the society 1% at a time. <br/>Join today.</p>
          <Link to={'/volunteer/VolunteerSignInUp'}><button className="btn2">SignUp & Participate</button></Link>
        </div>
      </div>
    </>
  );
}

export default SignUpIn;
