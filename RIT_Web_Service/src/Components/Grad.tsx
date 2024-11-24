import React, { useEffect, useState } from "react";

interface Graduate {
  degreeName: string;
  title: string;
  description: string;
  concentrations?: string[];
  availableCertificates?: string[];
}

const Grad = () => {
  const [data, setData] = useState<{ graduate: Graduate[] }>({ graduate: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/grad.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch graduate data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching graduate data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
