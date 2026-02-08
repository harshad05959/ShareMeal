import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Us</h1>
      <p className="contact-subheading">
        We'd love to hear from you. Reach out to us anytime.
      </p>

      <div className="contact-card">
        <div className="contact-item">
          <span>📍 Address</span>
          <p>Nigdi, Pune, Maharashtra, India</p>
        </div>

        <div className="contact-item">
          <span>📞 Phone</span>
          <p>+91 98765 43210</p>
        </div>

        <div className="contact-item">
          <span>📧 Email</span>
          <p>support@fooddonation.org</p>
        </div>

        <div className="contact-item">
          <span>⏰ Working Hours</span>
          <p>Mon – Sat | 9:00 AM – 7:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
