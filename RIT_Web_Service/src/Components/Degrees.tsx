
import React, { useState } from 'react';
import Grad from './Grad';
import Undergrad from './Undergrad'; 
import Minor from './Minor';
import Employ from './Employ';
import Courses from './Courses';
import { motion } from 'framer-motion';

const Degree = () => {
  const [popOutContent, setPopOutContent] = useState<React.ReactNode | null>(null);

  const handlePopOut = (content: React.ReactNode) => {
    setPopOutContent(content);
  };

  const closePopOut = () => {
    setPopOutContent(null);
  };

  return (
    <>
      <div id="degree">
        <div className="degree">
          <div className="title1">
            <p className="p2">
              <span className="dis">Discover</span> Our Degrees, Minors, and
              Employment
            </p>
            <p className="p3">
              We offer a diverse range of degrees and minors designed to empower
              your academic journey. Explore your passions and prepare for a
              successful career with our tailored programs.
            </p>
          </div>
          <div className="stuff">
            <div
              className="stuff1"
              onClick={() =>
                handlePopOut(
                  <>
                    <div className="butn2">
                      <button>Undergraduate Degree</button>
                    </div>
                    <Undergrad /> 
                  </>
                )
              }
            >
              <img src="/GlobalPlaza.jpg" alt="degree" className="degimg" />
              <div className="p5">
                <p className="comp">Undergraduate Degrees</p>
                <p>Our degree programs are crafted to meet industry demands.</p>
              </div>
            </div>
            <div
              className="stuff1"
              onClick={() =>
                handlePopOut(
                  <>
                    <div className="butn2">
                      <button>Graduate Degree</button>
                    </div>
                    <Grad /> 
                  </>
                )
              }
            >
              <img src="/GlobalPlaza.jpg" alt="degree" className="degimg" />
              <div className="p5">
                <p className="comp">Graduate Degrees</p>
                <p>Our degree programs are crafted to meet industry demands.</p>
              </div>
            </div>
            <div
              className="stuff1"
              onClick={() =>
                handlePopOut(
                  <div>
                    <div className="butn2">
                      <button>Minors</button>
                    </div>
                    <Minor/>
                  </div>
                )
              }
            >
              <img src="/BuskingGuitar.jpg" alt="degree" className="degimg" />
              <div className="p5">
                <p className="comp">Dynamic Minors for Every Interest</p>
                <p>Choose from a variety of minors to enhance your major.</p>
              </div>
            </div>
            <div
              className="stuff1"
              onClick={() =>
                handlePopOut(
                  <div>
                    <h2>Employment</h2>
                    <Employ/>
                  </div>
                )
              }
            >
              <img src="/ritlake.jpg" alt="degree" className="degimg" />
              <div className="p5">
                <p className="comp">Employment</p>
                <p>
                  Look at our past history of co-op and full-time employment
                  information of the current and past students in the
                  department.
                </p>
              </div>
            </div>
            <div
              className="stuff1"
              onClick={() =>
                handlePopOut(
                  <div>
                    <h2>Courses offers</h2>
                    <Courses/>
                  </div>
                )
              }
            >
              <img src="/ritlake.jpg" alt="degree" className="degimg" />
              <div className="p5">
                <p className="comp">Courses offers</p>
                <p>
                  This is all the courses that RIT offeres
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {popOutContent && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closePopOut}>
              Close
            </button>
            {popOutContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Degree;
