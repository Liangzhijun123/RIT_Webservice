import React from "react";

const Degree = () => {
  return (
    <>
      <div id="degree">
        <div className="degree">
          <div className="title1">
            <p className="p2">
              <span className="dis">Discover</span> Our Degrees, Minors, and Employment
            </p>
            <p className="p3">
              We offer a diverse range of degrees and minors designed to empower
              your academic journey. Explore your passions and prepare for a
              successful career with our tailored programs.
            </p>
          </div>
          <div className="stuff">
            <div className="stuff1">
                <img src="/GlobalPlaza.jpg" alt="degree" className="degimg"></img>
                <div className="p5">
                    <p className="comp">Comprehensive Degree Programs</p>
                    <p>Our degree programs are crafted to meet industry demands.</p>
                </div>
            </div>
            <div className="stuff1">
                <img src="/BuskingGuitar.jpg" alt="degree" className="degimg"></img>
                <div className="p5">
                    <p className="comp">Dynamic Minors for Every Interest</p>
                    <p>Choose from a variety of minors to enhance your major.</p>
                </div>
            </div>
            <div className="stuff1">
                <img src="/ritlake.jpg" alt="degree" className="degimg"></img>
                <div className="p5">
                    <p className="comp">Employment</p>
                    <p>Look at our past history of co-op and full-time employment information of the current and past students in the department. </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Degree;
