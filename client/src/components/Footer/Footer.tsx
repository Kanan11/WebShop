import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <Link className ="link" to="/products/1">Women</Link>
          <Link className ="link" to="/products/2">Men</Link>
          <Link className ="link" to="/products/3">Children</Link>
          <span>Accessories</span> {/* TODO make new component with all sub-categories */}
          <span>New Arrivals</span> {/* TODO make new endpoint with filter isNew */}
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
            amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
            ut labore etdolore.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
            amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
            ut labore etdolore.
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">store</span>
          <span className="copyright">
            © {new Date().getFullYear()} Copyright
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
