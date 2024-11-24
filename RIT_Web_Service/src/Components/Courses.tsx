import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Message, Icon } from "semantic-ui-react";

interface Course {
  courseID: string;
  title: string;
  description: string;
}

const Courses = () => {
  const [data, setData] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/course.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch API");
        }
        return response.json();
      })
      .then((data: Course[]) => {
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

  if (!data || data.length === 0) {
    return (
      <Message warning>
        <Message.Header>No Data Available</Message.Header>
        <p>Please try again later.</p>
      </Message>
    );
  }

  return (
    <div className="undergrad">
      <div className="coop-scrollable">
        <table className="ui fixed table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Course ID</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) => (
              <tr key={course.courseID}>
                <td>{course.title}</td>
                <td>{course.courseID}</td>
                <td>{course.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
