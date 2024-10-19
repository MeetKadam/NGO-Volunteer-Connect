import React from "react";
import "../fourthSectionContact/fourthSectionContact.css";

const fourthSectionContact = () => {
  return (
    <div className="contact-fourth-section">
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d45678.53677018832!2d-74.01936703019737!3d40.703263239831244!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1665221486030!5m2!1sen!2sbd"
          allowFullScreen={""}
          loading={"lazy"}
          referrerPolicy={"no-referrer-when-downgrade"}
         />
      </div>
    </div>
  );
};

export default fourthSectionContact;
