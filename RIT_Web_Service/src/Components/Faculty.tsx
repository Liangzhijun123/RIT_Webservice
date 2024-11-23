import React, { useEffect, useState } from "react";

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

const Faculty = () => {
  const [data, setData] = useState<{ faculty: FacultyMember[] }>({ faculty: [] });

  useEffect(() => {
    fetch('/faculty.json') 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch faculty data");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching faculty data:", error));
  }, []);

  return (
    <>
      <div id="faculty">
        <div className="faculty">
          <div className="faculty1">
            <div className="f1">
              <p className="p9">Faculty</p>
              <p className="p10">Meet our local faculty and staff members</p>
            </div>
          </div>
          <div className="stuff3">
            {data.faculty.map((item) => (
              <div className="stuff2" key={item.username}>
                <img
                  src={item.imagePath || "/placeholder.jpg"}
                  alt={`${item.name}'s profile`}
                  className="degimg"
                />
                <div className="p6">
                  <p>Professor: {item.name}</p>
                  <p>Senior lecture</p>
                  <p>
                    Website link:{" "}
                    {item.website ? (
                      <a href={item.website}>{item.website}</a>
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <p>
                    Description:{" "}
                    {item.interestArea || "No description available"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faculty;
