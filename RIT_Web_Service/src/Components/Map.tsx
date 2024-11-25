import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Proxy server and API URL
const proxyServer = "https://people.rit.edu/~dsbics/proxy/";
const apiUrl = "https://ischool.gccis.rit.edu/api/";

// Define the location type
interface Location {
  name: string;
  lat: string;
  lng: string;
}

async function getData<T>(endpoint: string): Promise<T | undefined> {
  try {
    const response = await fetch(proxyServer + apiUrl + endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const textResponse = await response.text();  // Get the raw response
    console.log("Raw API Response:", textResponse);  // Log the raw response

    try {
      const data = JSON.parse(textResponse);  // Try parsing as JSON
      return data as T;
    } catch (jsonError) {
      throw new Error("Failed to parse JSON response");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBjIs4emC7yI5Buj1syiFOCePko8K1rqpU", // Replace with your Google Maps API key
  });

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const result = await getData<{ locations: Location[] }>("map.php"); // Fetch the location data
        if (result?.locations) {
          setLocations(result.locations);
        } else {
          throw new Error("No location data found");
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  const defaultCenter = locations.length > 0 ? { 
    lat: parseFloat(locations[0].lat), 
    lng: parseFloat(locations[0].lng) 
  } : { lat: 43.0846, lng: -77.6743 }; // Fallback to default if no data yet

  return (
    <div>
      {loading && <div>Loading data...</div>}
      {error && <div>Error: {error}</div>}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        center={defaultCenter}
        zoom={14}
      >
        {/* Add markers for each location */}
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }}
            title={location.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
