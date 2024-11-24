import React, { useEffect, useState } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Message, Icon } from 'semantic-ui-react';

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

interface ProfessionalInfo{
    employer: string;
    degree: string;
    city: string;
    startDate:string;
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
  }
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
    return (
      <Message warning>
        <Message.Header>No Data Available</Message.Header>
        <p>Please try again later.</p>
      </Message>
    );
  }


  return (
    <div className="undergrad">
      {/* Introduction Section */}
      <section>
        <h1>{data.introduction.title}</h1>
        {data.introduction.content.map((item, index) => (
          <div key={index} className="name">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      {/* Degree Statistics Section */}
      <section>
        <h1>{data.degreeStatistics.title}</h1>
        <div className="name">
          <ul>
            {data.degreeStatistics.statistics.map((stat, index) => (
              <li key={index}>
                <strong>{stat.value}</strong>: {stat.description}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* employers */}
      <section>
        <h1>{data.employers.title}</h1>
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
        <h1>{data.careers.title}</h1>
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
        <h1>{data.coopTable.title}</h1>
        <div className="name">
          <p>CO-OP information list</p>

          <div className="coop-scrollable">
            {data.coopTable.coopInformation.map((item, index) => (
              <ul key={index} className="coop-row">
                <li>{item.employer}</li>
                <li>{item.degree}</li>
                <li>{item.city}</li>
                <li>{item.term}</li>

              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* employment */}
      <section>
        <h1>{data.employmentTable.title}</h1>
        <div className="name">
          <p>CO-OP information list</p>

          <div className="coop-scrollable">
            {data.employmentTable.professionalEmploymentInformation.map((item, index) => (
              <ul key={index} className="coop-rows">
                <li>{item.employer}</li>
                <li>{item.degree}</li>
                <li>{item.city}</li>
                <li>{item.startDate}</li>
                <li>{item.title}</li>
              </ul>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employ;
