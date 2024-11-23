import React, { useEffect, useState } from 'react';

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
    fetch('/grad.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch graduate data');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching graduate data:', error);
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
      {data.graduate.map((item) => (
        <div key={item.degreeName} className="name">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          
          {item.concentrations && item.concentrations.length > 0 ? (
            <>
              <p>Concentrations:</p>
              <ul>
                {item.concentrations.map((concentration, index) => (
                  <li key={index}>{concentration}</li>
                ))}
              </ul>
            </>
          ) : null}

          {item.availableCertificates && item.availableCertificates.length > 0 ? (
            <>
              <p>Available Certificates:</p>
              <ul>
                {item.availableCertificates.map((certificate, index) => (
                  <li key={index}>{certificate}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Grad;
