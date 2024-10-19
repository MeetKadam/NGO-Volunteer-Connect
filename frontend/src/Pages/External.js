import React, { useEffect } from 'react';
// import Navbar from '../components/Navbar/Navbar';

const External = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:3002';
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
        {/* <Navbar/> */}
    </div>
  );
}

export default External;
