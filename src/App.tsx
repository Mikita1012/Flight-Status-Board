import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FlightData } from './types/FlightData';
import Flights from './components/Flights';



function App() {
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightData>();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get<FlightData[]>('https://flight-status-mock.core.travelopia.cloud/flights');
        setFlightData(response.data);
        // console.log(response.data);
      } catch (err) {
        setError("Error in loading data")
      }
    };
    fetchFlights();
    const interval = setInterval(fetchFlights, 5000);
    return () => clearInterval(interval) // for cleanup when component is unmounted

  }, [])

  const handleSelectedFlight = async (id: number) => {
    try {
      const response = await axios.get(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`);
      setSelectedFlight(response.data);
    } catch (error) {
      setError('The requested flight details are unavailable.');
    }


  }

  return (

    <>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Flight Board ✈️</h1>
      {error ? (
        <p>{error}</p>
      ) : flightData.length > 0 ? (
        <Flights flightData={flightData} />
      ) : (
        <p>Loading...</p>
      )}
    </>




  );
}

export default App;
