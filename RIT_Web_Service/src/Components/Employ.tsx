import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Message, Icon } from "semantic-ui-react";
interface EmploymentInfo {
  employer: string;
  degree: string;
  city: string;
  startDate: string;
  title: string;
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

const Employment = () => {
  const [data, setData] = useState<{ employment: EmploymentInfo[] }>({ employment: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true); 
      try {
        const result = await getData<Record<"employment", EmploymentInfo[]>>("employment/");
        if (result?.employment) {
          setData({ employment: result.employment });
        } else {
          console.error("No employment data found");
          setData({ employment: [] }); 
        }
      } catch (error) {
        console.error("Error fetching employment data:", error);
        setData({ employment: [] }); 
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
    <div>
      <h2>Employment Information</h2>
      <table>
        <thead>
          <tr>
            <th>Employer</th>
            <th>Degree</th>
            <th>City</th>
            <th>Start Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {data.employment.map((item, index) => (
            <tr key={index}>
              <td>{item.employer}</td>
              <td>{item.degree}</td>
              <td>{item.city}</td>
              <td>{item.startDate}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employment;
