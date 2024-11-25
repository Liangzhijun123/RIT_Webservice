import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Message, Icon } from "semantic-ui-react";

interface ContentItem {
  title: string;
  description: string;
}

interface CoopInfo {
  employer: string;
  degree: string;
  city: string;
  term: string;
}

interface ProfessionalInfo {
  employer: string;
  degree: string;
  city: string;
  startDate: string;
  title: string;
}

interface DegreeStatistic {
  value: string;
  description: string;
}

interface DataStructure {
  introduction: {
    title: string;
    content: ContentItem[];
  };
  degreeStatistics: {
    title: string;
    statistics: DegreeStatistic[];
  };
  employers: {
    title: string;
    employerNames: string[];
  };
  careers: {
    title: string;
    careerNames: string[];
  };
  coopTable: {
    title: string;
    coopInformation: CoopInfo[];
  };
  employmentTable: {
    title: string;
    professionalEmploymentInformation: ProfessionalInfo[];
  };
}

const Employ = () => {
  const [data, setData] = useState<DataStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/employ.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch API");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
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

  if (!data) {
    return <p>No data available.</p>;
  }

  return (
    <div className="undergrad">
      {/* Introduction Section */}
      <section>
        <h2>{data.introduction.title}</h2>
        {data.introduction.content.map((item, index) => (
          <div key={index} className="name">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      {/* Degree Statistics Section */}
      <section>
        <h2>{data.degreeStatistics.title}</h2>
        <div className="name">
          

          <div className="coop-scrollable">
            <table className="ui fixed table">
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {data.degreeStatistics.statistics.map((stat, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{stat.value}</strong>
                    </td>
                    <td>{stat.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* employers */}
      <section>
        <h2>{data.employers.title}</h2>
        <div className="name">
          <ul>
            {data.employers.employerNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* careers */}
      <section>
        <h2>{data.careers.title}</h2>
        <div className="name">
          <ul>
            {data.careers.careerNames.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* coop table */}
      <section>
        <h2>{data.coopTable.title}</h2>
        <div className="name">
        

          <div className="coop-scrollable">
            <table className="ui fixed table">
              <thead>
                <tr>
                  <th>Employer</th>
                  <th>Degree</th>
                  <th>City</th>
                  <th>Term</th>
                </tr>
              </thead>
              <tbody>
                {data.coopTable.coopInformation.map((item, index) => (
                  <tr key={index}>
                    <td>{item.employer}</td>
                    <td>{item.degree}</td>
                    <td>{item.city}</td>
                    <td>{item.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* employment */}
      <section>
        <h2>{data.employmentTable.title}</h2>
        <div className="name">
       

          <div className="coop-scrollable">
            <table className="ui fixed table">
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
                {data.employmentTable.professionalEmploymentInformation.map(
                  (item, index) => (
                    <tr key={index}>
                      <td>{item.employer}</td>
                      <td>{item.degree}</td>
                      <td>{item.city}</td>
                      <td>{item.startDate}</td>
                      <td>{item.title}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employ;