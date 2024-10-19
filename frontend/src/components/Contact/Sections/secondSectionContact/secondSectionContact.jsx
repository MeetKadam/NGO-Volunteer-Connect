import React from 'react'
import "../secondSectionContact/secondSectionContact.css"
import { FaMapMarkerAlt } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { BsFillTelephoneFill } from "react-icons/bs"

function secondSectionContact() {
    return (
        <div className='contact-second-section'>
            <div className='second-container-contact'>

                <div className='contact-second-column-container'>
                    <div className='address-div'>
                        <div className='svg-box-container-contact'>
                            < FaMapMarkerAlt />
                        </div>
                        <h3>Address</h3>
                        <h4> 7 Green Lake Street Crawfordsville, IN 47933 </h4>
                    </div>

                    <div className='email-div'>
                        <div className='svg-box-container-contact'>
                            < MdEmail />
                        </div>
                        <h3>Email Us</h3>
                        <h4>charitio@gmail.com</h4>
                        <h4>helloyou@gmail.com</h4>
                    </div>

                    <div className='call-div'>
                        <div className='svg-box-container-contact'>
                            < BsFillTelephoneFill />
                        </div>
                        <h3>Call Now</h3>
                        <h4>+1 800 123 456 789</h4>
                        <h4>+1 800 123 654 987</h4>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default secondSectionContact