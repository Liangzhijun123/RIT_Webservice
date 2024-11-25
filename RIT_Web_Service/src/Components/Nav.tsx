import React from "react";
import "../index.css";

const Nav = () => {
  return (
    <>
      <div className="Bignav">
        <div className="Secondnav">
          <div>
            <img src="/new_RIT_logo1_RGB_0.png" alt="RIT logo" className="rit"></img>
          </div>

          <div className="Linknav">
            <a className="link" href="#about-us">About Us</a>
            <a className="link" href="#degree">Our Degrees</a>
            <a className="link" href="#faculty">Faculty</a>
            <a className="link" href="#map">Map</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
