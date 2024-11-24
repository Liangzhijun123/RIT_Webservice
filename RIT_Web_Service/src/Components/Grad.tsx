import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Message, Icon } from "semantic-ui-react";

interface Graduate {
  degreeName: string;
  title: string;
  description: string;
  concentrations?: string[];
  availableCertificates?: string[]; 
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

const Grad = () => {
  const [data, setData] = useState<{ graduate: Graduate[] }>({ graduate: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getData<Record<"graduate", Graduate[]>>("degrees/graduate");
        if (result?.graduate) {
          setData({ graduate: result.graduate });
        } else {
          console.error("No undergraduate data found");
        }
      } catch (error) {
        console.error("Error fetching undergraduate data:", error);
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

  if (!data.graduate || data.graduate.length === 0) {
    return <div>No graduate data available.</div>;
  }

  return (
    <div className="undergrad">
      <div className="coop-scrollable">
        <table className="ui fixed table">
          <thead>
            <tr>
              <th>Degree Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Concentrations</th>
              <th>Available Certificates</th>
            </tr>
          </thead>
          <tbody>
            {data.graduate.map((item) => (
              <tr key={item.degreeName}>
                <td>{item.degreeName}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  {item.concentrations && item.concentrations.length > 0 ? (
                    <ul>
                      {item.concentrations.map((concentration, index) => (
                        <li key={index}>{concentration}</li>
                      ))}
                    </ul>
                  ) : (
                    "None"
                  )}
                </td>
                <td>
                  {item.availableCertificates &&
                  item.availableCertificates.length > 0 ? (
                    <ul>
                      {item.availableCertificates.map((certificate, index) => (
                        <li key={index}>{certificate}</li>
                      ))}
                    </ul>
                  ) : (
                    "None"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grad;
