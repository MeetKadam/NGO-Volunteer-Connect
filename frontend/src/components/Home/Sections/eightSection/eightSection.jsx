import React from 'react'
import '../eightSection/eightSection.css'
import EigthPic1 from "../../../Images/pic1-eightSection.jpg"
import EigthPic2 from "../../../Images/pic2-eightSection.jpg"
import EigthPic3 from "../../../Images/pic3-eightSection.jpg"
const eightSection = () => {
    return (
        <div className='home-eigth-section'>
            <div className='eigth-container'>
                <div className='eigth-upper-container'>
                    <h4>Events</h4>
                    <h2>Fundraising Events</h2>
                    <p>There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form,</p>
                </div>
                <div className='eigth-lower-container'>
                    <div className='eigth-lower-column-container'>
                        <div className='soul-div'>
                            <img src={EigthPic1} />
                            <h4>25 Nov, 2021 </h4>
                            <h2><a href="#">Help The Poor From Your Soal</a></h2>
                            <p>
                                There are many variations of passages of Lorem Ipsum available.
                            </p>
                        </div>
                        <div className='poverty-div'>
                            <img src={EigthPic2} />
                            <h4>26 Nov, 2021 </h4>
                            <h2><a href="#">Help Children Raise Out Of Proverty.</a></h2>
                            <p>
                                There are many variations of passages of Lorem Ipsum available.
                            </p>
                        </div>
                        <div className='gift-div'>
                            <img src={EigthPic3} />
                            <h4>27 Nov, 2021 </h4>
                            <h2><a href="#">Provideing Education Is The Valuable Gift</a></h2>
                            <p>
                                There are many variations of passages of Lorem Ipsum available.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default eightSection