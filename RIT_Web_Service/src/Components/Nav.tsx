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
            <a className="link">About Us</a>
            <a className="link">Our Degrees</a>
            <a className="link">Minors Offered</a>
            <a className="link">Employment</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
