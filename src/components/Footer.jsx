import React from "react";
import { Mail, Phone, MapPin, Link as LinkIcon, Play } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <img src="/IMG_4796.jpeg" alt="Bakkiyam Metal Mart" className="footer-logo" onError={(e)=>{e.target.style.display='none'}} />
          <h3>Bakkiyam Metal Mart</h3>
          <p>
            Premium household products and metal vessels. Quality you can trust for home and kitchen.
          </p>
          <div className="social-icons">
            <a className="social-icon" href="https://www.facebook.com/share/18kpJJu1Rb/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07C2 17.1 5.66 21.3 10.44 22v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.77l-.44 2.9h-2.33V22C18.34 21.3 22 17.1 22 12.07z"/></svg>
            </a>
            <a className="social-icon" href="https://www.instagram.com/bakkiyammetals" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm5.2-.9a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2z"/></svg>
            </a>
            <a className="social-icon" href="https://wa.me/message/QU3D6U7D35VSH1" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 .5 11.94 11.94 0 0 0 3.48 3.48 11.94 11.94 0 0 0 .5 12a11.87 11.87 0 0 0 2.9 7.66L2 22l2.41-.63A11.94 11.94 0 0 0 12 23.5a11.94 11.94 0 0 0 8.52-3.48A11.94 11.94 0 0 0 23.5 12a11.94 11.94 0 0 0-3-8.52zM12 21a9 9 0 0 1-5-1.4l-.36-.22-3.1.8.83-3.02-.23-.39A9 9 0 1 1 21 12a9 9 0 0 1-9 9z"/></svg>
            </a>
            <a className="social-icon" href="#" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 15l5.2-3L10 9v6zm11-6.2s0-1.8-.2-2.6c-.2-.9-.8-1.4-1.7-1.6C17.6 4 12 4 12 4s-5.6 0-7.1.6c-.9.2-1.5.8-1.7 1.6C3 6.9 3 8.7 3 8.7S3 10.6 3.1 11.3c.1.9.7 1.5 1.6 1.7C6.4 13.5 12 13.5 12 13.5s5.6 0 7.1-.5c.9-.2 1.5-.8 1.7-1.7.2-.7.2-1.8.2-1.8z"/></svg>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><a href="#products">Stainless Steel Vessels</a></li>
            <li><a href="#products">Silver Vessels</a></li>
            <li><a href="#products">Bronze Vessels</a></li>
            <li><a href="#products">Aluminium Vessels</a></li>
            <li><a href="#products">Tiffin Boxes</a></li>
            <li><a href="#products">Water Bottles</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#products">Shop</a></li>
            <li><a href="#">Bulk Orders</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <MapPin size={18} />
            <div>
              <p>8/3712, PN Road,</p>
              <p>Koothampalayam Pirivu, Tiruppur - 641602</p>
            </div>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <p>+91 7010553387</p>
          </div>
          <div className="contact-item">
            <Mail size={18} />
            <p>bakkiyammetals@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Bakkiyam Metal Mart. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Shipping Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
