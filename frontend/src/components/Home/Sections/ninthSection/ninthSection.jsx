import React from 'react'
import '../ninthSection/ninthSection.css'
import UpperPic1 from "../../../Images/ninthSection-pic1.jpg"
import UpperPic2 from "../../../Images/ninthSection-pic2.jpg"
import UpperPic3 from "../../../Images/ninthSection-pic3.jpg"
import LowerPic1 from "../../../Images/brad.jfif"
import LowerPic2 from "../../../Images/konal.jfif"
import LowerPic3 from "../../../Images/jenefer.jfif"
import { BsChatText } from 'react-icons/bs'
function ninthSection() {
    return (
        <div className='home-ninth-section'>
            <div className='ninth-container'>
                <div className='ninth-upper-container'>
                    <h4>Our Blog</h4>
                    <h2>Latest News & Update</h2>
                    <p>There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form,</p>
                </div>
            </div>
            <div className='ninth-lower-container'>
                <div className='ninth-lower-column-container'>
                    <div className='ninth-lower-first-div'>
                        <img src={UpperPic1} />
                        <h2><a href="#">Giving The Poor Is A Great Satisfiction Of heart.</a></h2>
                        <hr />
                        <div className='ninth-section-comments'>
                            <img src={LowerPic1} />
                            <p ><a href="#">Jenefer Willy</a></p>
                            <p id='ninth-section-comments-template'> <BsChatText /> 35 </p>
                        </div>
                    </div>
                    <div className='ninth-lower-second-div'>
                        <img src={UpperPic2} />
                        <h2><a href="#">Your Help Can Make Someone’s life Easier.</a></h2>
                        <hr />
                        <div className='ninth-section-comments'>
                            <img src={LowerPic2} />
                            <p><a href="#">Laura Falary</a></p>
                            <p id='ninth-section-comments-template'> <BsChatText /> 80 </p>
                        </div>
                    </div>
                    <div className='ninth-lower-third-div'>
                        <img src={UpperPic3} />
                        <h2><a href="#">Give Education, It’s The Best Gift Ever.</a></h2>
                        <hr />
                        <div className='ninth-section-comments'>
                            <img src={LowerPic3} />
                            <p><a href="#">Laura Falary</a></p>
                            <p id='ninth-section-comments-template'> <BsChatText /> 95 </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ninthSection