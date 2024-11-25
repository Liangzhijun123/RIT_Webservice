import React from "react";
import "../index.css";

const Nav = () => {
  return (
    <>
      <div className="Bignav">
        <div className="Secondnav">
          <div>
            <img src="/~zl5660/RIT_Web_Service/new_RIT_logo1_RGB_0.png" alt="RIT logo" className="rit"></img>
          </div>

          <div className="Linknav">
            <a className="link" href="#about-us">About Us</a>
            <a className="link" href="#degree">Our Degrees</a>
            <a className="link" href="#faculty">Faculty</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
