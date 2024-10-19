import React from 'react'
import "../Home/Home.css"
import FirstSection from './Sections/firstSection/firstSection.jsx'
import SecondSection from './Sections/secondSection/secondSection.jsx'
import ThirdSection from './Sections/thirdSection/thirdSection.jsx'
import FourthSection from './Sections/fourthSection/fourthSection.jsx'
import FifthSection from './Sections/fifthSection/fifthSection.jsx'
import SixthSection from './Sections/sixthSection/sixthSection'
import SeventhSection from './Sections/seventhSection/seventhSection'
import EightSection from './Sections/eightSection/eightSection'
import NinthSection from './Sections/ninthSection/ninthSection'
import TenthSection from './Sections/tenthSection/tenthSection'
import Navbar from '../Navbar/Navbar.jsx'
const Home = () => {
  return (
    <div className='home-container'>
        <Navbar />
<div>
      < FirstSection />
      < SecondSection />
      < ThirdSection />
      < FourthSection />
      < FifthSection />
      < SixthSection />
      < SeventhSection />
      < EightSection />
      < NinthSection />
      < TenthSection />
      </div>
    </div>
  )
}
export default Home