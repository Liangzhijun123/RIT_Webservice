import React, { useEffect, useState } from "react";

interface UMinor {
  name: string;
  title: string;
  description: string;
  courses: string[];
  note?: string;
}

const Minor = () => {
  const [data, setData] = useState<{ UgMinors: UMinor[] }>({ UgMinors: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/minor.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="undergrad">
  <div className="table-container">
    <table className="ui fixed table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Description</th>
          <th>Courses</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {data.UgMinors.map((item) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.title}</td>
            <td className="scrollable-description">
              {item.description}
            </td>
            <td>
              <ul>
                {item.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </td>
            <td>{item.note ? item.note : "None"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Minor;
