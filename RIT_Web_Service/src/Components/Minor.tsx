import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Message, Icon } from "semantic-ui-react";

interface UMinor {
  name: string;
  title: string;
  description: string;
  courses: string[];
  note?: string;
}

const proxyServer = "https://people.rit.edu/~dsbics/proxy/";
const apiUrl = "https://ischool.gccis.rit.edu/api/";

async function getData<T>(endpoint: string): Promise<T | undefined> {
  try {
    const response = await fetch(proxyServer + apiUrl + endpoint);
    console.log('Fetching:', proxyServer + apiUrl + endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch (${response.status}): ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Response Data:', data);
    return data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

const Minor = () => {
  const [data, setData] = useState<UMinor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getData<{ UgMinors: UMinor[] }>("minors");
        if (result?.UgMinors) {
          setData(result.UgMinors);
        } else {
          setError("No minors data found.");
        }
      } catch (error: any) {
        setError(error.message || "An unknown error occurred.");
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
  
  if (error) return (
    <Message negative>
      <Icon name="warning" />
      {error}
    </Message>
  );

  return (
    <div className="minor">
      <div className="table-wrapper">
  <table className="ui fixed table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Title</th>
        <th>Description</th>
        <th>Courses</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.title}</td>
          <td className="scrollable-description">{item.description}</td>
          <td>
            <ul>
              {item.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </td>
          <td>{item.note || "None"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Minor;
