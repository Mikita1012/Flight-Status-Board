import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FlightData } from './types/FlightData';
import { log } from 'console';
import Flights from './components/Flights';


function App() {
  const [flightData, setFlightData] = useState<FlightData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get<FlightData[]>('https://flight-status-mock.core.travelopia.cloud/flights');
        setFlightData(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Error in loading data")
      }
    };
    fetchFlights();
    const interval = setInterval(fetchFlights, 5000);
    return () => clearInterval(interval) // for cleanup when component is unmounted

  }, [])
  return (
    <>
      <h1>Flight Board ✈️</h1>
      <table border={2}>
        <tr>
          <th>Flight Number</th>
          <th>Airline</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Arrival Time</th>
          <th>Departure Time</th>
          <th>Status</th>
        </tr>
      </table>
      {error ? (
        <p>{error}</p>
      ) : flightData ? (
        flightData.map((flight) => (
          <Flights key={flight.id} flightData={flight} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>




  );
}

export default App;
