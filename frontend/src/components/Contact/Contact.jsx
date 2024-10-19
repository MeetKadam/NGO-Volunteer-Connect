import React from 'react'
import FirstSectionContact from './Sections/firstSectionContact/firstSectionContact'
import SecondSectionContact from './Sections/secondSectionContact/secondSectionContact'
import ThirdSectionContact from './Sections/thirdSectionContact/thirdSectionContact'
import FourthSectionContact from './Sections/fourthSectionContact/fourthSectionContact'
import "../Contact/Contact.css"
import Navbar from '../Navbar/Navbar'
const Contact = () => {
  return (
    <div className='contact-page-container'>
      <Navbar/>

      < FirstSectionContact />
      < SecondSectionContact />
      < ThirdSectionContact />
      < FourthSectionContact />

    </div>
  )
}

export default Contact