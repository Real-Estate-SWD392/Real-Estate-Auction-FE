import React from "react";
import "./Footer.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

import logo_house from "../../../assets/img/logo_hubzu-house.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-content-item about">
          <div className="footer-item-header">About Hubzu</div>
          <ul>
            <li>About Us</li>
            <li>Press Releases</li>
            <li>In the News</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        <div className="footer-content-item help">
          <div className="footer-item-header">Help</div>
          <ul>
            <li>Contact Us</li>
            <li>List a Home</li>
            <li>FAQs</li>
            <li>Site Map</li>
          </ul>
        </div>

        <div className="footer-content-item follow">
          <div className="footer-item-header">Follow Us</div>
          <ul>
            <li className="follow-footer-item" style={{display:"flex", alignItems:"center"}}>
              <FacebookIcon style={{color:"#3B5998", marginRight:"5px"}}/>
              Facebook
            </li>
            <li className="follow-footer-item" style={{display:"flex", alignItems:"center"}}>
              <TwitterIcon style={{color:"#00ACEE", marginRight:"5px"}}/>
              Twitter
            </li>
            <li className="follow-footer-item" style={{display:"flex", alignItems:"center"}}>
              <LinkedInIcon style={{color:"#0E76A8", marginRight:"5px"}}/>
              LinkedIn
            </li>
            <li className="follow-footer-item" style={{display:"flex", alignItems:"center"}}>
              <YouTubeIcon style={{color:"#FF0000", marginRight:"5px"}}/>
              YouTube
            </li>
          </ul>
        </div>

        <div className="footer-content-item popular">
          <div className="footer-item-header">Popular Searches</div>
          <ul>
            <li>Auctions Near Me</li>
            <li>Foreclosures Near Me</li>
            <li>Bank Owned Near Me</li>
          </ul>
        </div>
      </div>

      <img src={logo_house} alt="" className="logo-house" />

      <p className="footer-description">
        Hubzu is a technology platform used by licensed real estate brokers and
        sellers to market properties and manage bids for those properties.
        Properties are available to all persons, regardless of race, color,
        religion, sex, handicap, familial status, or national origin. If you are
        using a screen reader and are having problems using this website, please
        call (855) 339-6325 for assistance.
      </p>

      <p className="footer-description">
      Fair Housing and Equal Opportunity | Privacy Rights | Terms & Conditions |  | Disclaimer & Trademark
      </p>

      <p className="footer-description">
      © 2012 - 2024 Altisource. All Rights Reserved.
      </p>


    </div>
  );
};

export default Footer;
