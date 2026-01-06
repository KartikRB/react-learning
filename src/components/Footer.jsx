import React from "react";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-color-primary">About Us</h5>
            <p>
              This is your one-stop online store for electronics, gadgets, and accessories. Quality products, fast delivery, and excellent customer service.
            </p>
          </div>
          <div className="col-md-2 mb-4">
            <h5 className="text-color-primary">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? "text-decoration-none active-link" : "text-light text-decoration-none"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/shop" 
                  className={({ isActive }) => 
                    isActive ? "text-decoration-none active-link" : "text-light text-decoration-none"
                  }
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    isActive ? "text-decoration-none active-link" : "text-light text-decoration-none"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => 
                    isActive ? "text-decoration-none active-link" : "text-light text-decoration-none"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5 className="text-color-primary">Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/faq" 
                className={({ isActive }) => 
                  isActive ? "text-decoration-none active-link" : "text-light text-decoration-none"
                }
                >
                  Faq's
                </NavLink>
              </li>
              <li>
                <NavLink to="/support" 
                className={({ isActive }) => 
                  isActive ? "text-decoration-none active-link" : "text-light text-decoration-none"
                }
                >
                  Support
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mb-4">
            <h5 className="text-color-primary">Contact</h5>
            <p className="mb-0">Email: support@react-learning.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        <hr className="border-light" />
        <p className="text-center mb-0"><span className="text-color-primary">&copy;</span> {new Date().getFullYear()} React Learning. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
