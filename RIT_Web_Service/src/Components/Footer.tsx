import React, { useEffect, useState } from "react";

interface FooterData {
  social: {
    title: string;
    tweet: string;
    by: string;
    twitter: string;
    facebook: string;
  };
  quickLinks: {
    title: string;
    href: string;
  }[];
  copyright: {
    title: string;
    html: string;
  };
  news: string;
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

const Footer = () => {
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getData<FooterData>("footer/");
        if (result) {
          setData(result);
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load footer data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p>Loading footer...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="social">
          <h3>{data?.social.title}</h3>
          <p>{data?.social.tweet}</p>
          <p>{data?.social.by}</p>
          <div className="social-links">
            <a href={data?.social.twitter} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href={data?.social.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>

 
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            {data?.quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        
        <div className="copyright" dangerouslySetInnerHTML={{ __html: data?.copyright.html || "" }} />
      </div>

   
      <div className="news">
        <a href={data?.news} target="_blank" rel="noopener noreferrer">
          Latest News
        </a>
      </div>
    </footer>
  );
};

export default Footer;
