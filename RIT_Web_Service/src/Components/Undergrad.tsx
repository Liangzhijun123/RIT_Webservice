
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
      {data.undergraduate.map((item) => (
        <div key={item.degreeName} className="name">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <p>Concentrations:</p>
          <ul>
            {item.concentrations.map((concentration, index) => (
              <li key={index}>{concentration}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Undergrad;
