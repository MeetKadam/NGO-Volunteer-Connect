import React from 'react'
import './fourthSection.css'
import FourthMedicine from "../../../Images/medicine_fourth.png"
import FourthMedicineProgress from "../../../Images/medicine-progress.png"
import Food from "../../../Images/food.png"
import FoodProgress from "../../../Images/food-progress.png"
import Education from "../../../Images/education.png"
import EducationProgress from "../../../Images/education-progress.png"
import Woman from "../../../Images/woman-fourth-section.png"
const fourthSection = () => {
    return (
        <div className='home-fourth-section'>
            <div className='fourth-container'>
                <div className='fourth-upper-container'>
                    <h4>We Love To Help Poor</h4>
                    <h2>Our Featured Campaigns</h2>
                    <p>There are many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form,</p>
                </div>
                <div className='fourth-lower-container'>
                    <div className='fourth-lower-column-container'>
                        <div className='education-div'>
                            <img src={Education} className="img-template" />
                            <br />
                            <h2><a href="#">Help To Build a Secure Life Of a Poor Children.</a></h2>
                            <br />
                            <img src={EducationProgress} className="img-template-progress" />
                            <hr />
                            <div className='fourth-section-donate'>
                                <img src={Woman} />
                                <p><a href="#">Monica Gellerc:\Users\Aryav Jain\Downloads\ind1.jpg</a></p>
                                <button>Donate Now</button>
                            </div>
                        </div>
                        <div className='food-div'>
                            <img src={Food} className="img-template" />
                            <br />
                            <h2><a href="#">Ensure Clean Water To The African Kids.</a></h2>
                            <br />
                            <img src={FoodProgress} className="img-template-progress" />
                            <hr />
                            <div className='fourth-section-donate'>
                                <img src={Woman} />
                                <p><a href="#">Rachael Green</a></p>
                                <button>Donate Now</button>
                            </div>
                        </div>
                        <div className='medicine-div'>
                            <img src={FourthMedicine} className="img-template" />
                            <br />
                            <h2><a href="#">Your Help Can Save A Human Life From Death.</a></h2>
                            <br />
                            <img src={FourthMedicineProgress} className="img-template-progress" />
                            <hr />
                            <div className='fourth-section-donate'>
                                <img src={Woman} />
                                <p><a href="#">Laura Falary</a></p>
                                <button>Donate Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default fourthSection