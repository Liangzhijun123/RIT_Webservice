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
  const [data, setData] = useState<FacultyMember[]>([]);

  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/https://ischool.gccis.rit.edu/api/people/faculty/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
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
            <div className="stuff2">
              <img src="/degree.jpg" alt="degree" className="degimg" />
              {data.map((item) => (
                <div className="p6" key={item.username}>
                  <p>Professor: {item.name}</p>
                  <p>Senior lecture</p>
                  <p>Website link: {item.website}</p>
                  <p>Description: {item.interestArea}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faculty;
