import React from 'react'
import '../fifthSection/fifthSection.css'
import FifthSectionSlider from '../../../Sliders/FifthSectionSlider.jsx'
import ind1 from './ind1.jpg'
function fifthSection() {
    return (
        <div className='home-fifth-section'>
            <div className='fifth-container'>
            <div className='fifth-upper-container'>
            <h4>Expert Team</h4>
            <h2>Meet Our Dedicated Volunteer Team</h2>
            <p>Our team is made up of passionate individuals who are committed to making a difference in the lives of those in need.</p>
            </div>

                <div className='fifth-lower-container'>
                    < FifthSectionSlider />
                </div>
            </div>
        </div>
    )
}
export default fifthSection