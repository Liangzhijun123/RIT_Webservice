import React, { useEffect, useState } from "react";
import { animated } from "@react-spring/web";
import { styled } from "@stitches/react";
import "semantic-ui-css/semantic.min.css";
import { Message, Icon } from "semantic-ui-react";

interface About {
  title: string;
  description: string;
  quote: string;
  quoteAuthor: string;
}

const proxyServer = "https://people.rit.edu/~dsbics/proxy/";
const apiUrl = "https://ischool.gccis.rit.edu/api/";

async function getData<T>(endpoint: string): Promise<T | undefined> {
  try {
    const response = await fetch(proxyServer + apiUrl + endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<{ about: About[] }>({ about: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getData<About>("about/");
        if (result) {
          setData({ about: [result] }); 
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  

  if (loading) {
    return (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We're fetching that content for you.
        </Message.Content>
      </Message>
    );
  }

  if (error) {
    return (
      <Message negative>
        <Message.Header>Error</Message.Header>
        <p>{error}</p>
      </Message>
    );
  }

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
  
          {data.about.map((item, index) => (
            <div key={index}>
              <p className="discover">{item.description}</p>
              <blockquote>
                <p>"{item.quote}"</p>
                <footer>- {item.quoteAuthor}</footer>
              </blockquote>
            </div>
          ))}
  
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
      {isOpen && <OverlayBackground onClick={() => setIsOpen(false)} />}
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
