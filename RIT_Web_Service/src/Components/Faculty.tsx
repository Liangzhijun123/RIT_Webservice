import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Message, Icon } from "semantic-ui-react";

interface FacultyMember {
  username: string;
  name: string;
  tagline?: string;
  imagePath: string;
  title: string;
  interestArea?: string;
  office: string;
  website?: string;
  phone?: string;
  email: string;
  twitter?: string;
  facebook?: string;
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

const Faculty = () => {
  const [data, setData] = useState<{ faculty: FacultyMember[] }>({
    faculty: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await getData<{ faculty: FacultyMember[] }>("people/");
        if (result?.faculty) {
          setData(result);
        } else {
          throw new Error("No faculty data found");
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div id="faculty">
      <div className="faculty">
        <div className="faculty1">
          <div className="f1">
            <p className="p9">Faculty</p>
            <p className="p10">Meet our local faculty and staff members</p>
          </div>
        </div>

        {loading ? (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>Loading faculty data...</Message.Content>
          </Message>
        ) : error ? (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
          </Message>
        ) : (
          <div
            style={{
              maxHeight: "1000px",
              overflowY: "auto",
              border: "1px solid #ddd",
            }}
          >
            <table className="ui fixed table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Professor</th>
                  <th>Title</th>
                  <th>Office</th>
                  <th>Website</th>
                  <th>Interest Areas</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {data.faculty.map((item) => (
                  <tr key={item.username}>
                    <td>
                      <img
                        src={item.imagePath || "/placeholder.jpg"}
                        alt={`${item.name}'s profile`}
                        style={{
                          width: "100px",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.title}</td>
                    <td>{item.office}</td>
                    <td>
                      {item.website ? (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.website}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{item.interestArea || "No description available"}</td>
                    <td>
                      <a
                        href={`mailto:${item.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.email}
                      </a>
                    </td>
                    <td>{item.phone || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculty;
