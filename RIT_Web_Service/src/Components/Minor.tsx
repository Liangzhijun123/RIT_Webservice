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
        fetch('/minor.json')
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
            {data.UgMinors.map((item) => (
                <div key={item.name} className="name">
                    <p>{item.name}</p>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <p>Courses:</p>
                    <ul>
                        {item.courses.map((course, index) => (
                            <li key={index}>{course}</li>
                        ))}
                    </ul>
                    {item.note && <p>{item.note}</p>} 
                </div>
            ))}
        </div>
    );
};

export default Minor;
