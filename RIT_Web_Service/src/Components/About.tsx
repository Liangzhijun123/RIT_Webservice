import React, { useState } from "react";
import { animated } from "@react-spring/web";
import { styled } from "@stitches/react";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="about-us">
      <div className="about-container">
        <img src="/RIT-NY-Campus.jpg" alt="RIT" className="school" />
        <div className="title">
          <h1 className="explore">
            {Array.from("Explore Your Future").map((char, index) => (
              <span key={index}>{char === " " ? "\u00A0" : char}</span>
            ))}
          </h1>

          <p className="discover">
            Discover a wide range of opportunities in our core areas, including
            About, Degrees, Minors, Employment, and People. Each section is
            designed to guide you through your academic journey and career
            prospects.
          </p>
          <div className="butn">
            <Trigger onClick={() => setIsOpen(true)}>
              <TriggerShadow />
              <TriggerEdge />
              <TriggerLabel>Learn More</TriggerLabel>
            </Trigger>
            <Trigger onClick={() => setIsOpen(true)}>
              <TriggerShadow />
              <TriggerEdge />
              <TriggerLabel>Get Started</TriggerLabel>
            </Trigger>
          </div>
        </div>
      </div>
      {isOpen && (
        <OverlayBackground
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
};

export default About;

const TriggerPart = styled("span", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: 8,
});

const TriggerShadow = styled(TriggerPart, {
  background: "hsl(0deg 0% 0% / 0.1)",
  transform: "translateY(2px)",
  transition: "transform 250ms ease-out",
});

const TriggerEdge = styled(TriggerPart, {
  background: `linear-gradient(
      to left,
      hsl(0deg 0% 69%) 0%,
      hsl(0deg 0% 85%) 8%,
      hsl(0deg 0% 85%) 92%,
      hsl(0deg 0% 69%) 100%
    )`,
});

const TriggerLabel = styled("span", {
  display: "block",
  position: "relative",
  borderRadius: 8,
  color: "#569AFF",
  fontSize: "14px",
  padding: "16px 24px",
  background: "#fafafa",
  transform: "translateY(-4px)",
  width: "100%",
  userSelect: "none",
  transition: "transform 250ms ease-out",
});

const Trigger = styled("button", {
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
  background: "transparent",
  position: "relative",
  padding: 0,
  transition: "filter 250ms ease-out",

  "&:hover": {
    filter: "brightness(110%)",
    [`& ${TriggerLabel}`]: {
      transform: "translateY(-6px)",
    },
    [`& ${TriggerShadow}`]: {
      transform: "translateY(4px)",
    },
  },

  "&:active": {
    [`& ${TriggerLabel}`]: {
      transform: "translateY(-2px)",
      transition: "transform 34ms",
    },

    [`& ${TriggerShadow}`]: {
      transform: "translateY(1px)",
      transition: "transform 34ms",
    },
  },
});

const OverlayBackground = styled(animated.div, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "1100px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  
  cursor: "pointer", 
});
