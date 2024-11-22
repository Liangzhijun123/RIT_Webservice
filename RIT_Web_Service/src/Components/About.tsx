import React from "react";

const About = () => {
  return (
    <>
      <div id="about-us">
        <div className="about-container">
          <img src="/RIT-NY-Campus.jpg" alt="RIT" className="school"></img>
          <div className="title">
            <p className="explore">Explore Your Future with Our Core Areas</p>
            <p className="discover">
              Discover a wide range of opportunities in our core areas,
              including About, Degrees, Minors, Employment, and People. Each
              section is designed to guide you through your academic journey and
              career prospects.
            </p>
            <div className="butn">
              <button className="butn1">Learn More</button>
              <button className="butn1">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
