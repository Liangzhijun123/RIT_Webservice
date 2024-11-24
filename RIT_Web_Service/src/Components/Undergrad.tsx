
import React, { useEffect, useState } from 'react';

interface Undergraduate {
  degreeName: string;
  title: string;
  description: string;
  concentrations: string[];
}

const Undergrad = () => {
  const [data, setData] = useState<{ undergraduate: Undergraduate[] }>({ undergraduate: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/undergrad.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch undergraduate data');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching undergraduate data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
          </tr>
        </thead>
        <tbody>
          {data.undergraduate.map((item) => (
            <tr key={item.degreeName}>
              <td>{item.degreeName}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <ul>
                  {item.concentrations.map((concentration, index) => (
                    <li key={index}>{concentration}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default Undergrad;
