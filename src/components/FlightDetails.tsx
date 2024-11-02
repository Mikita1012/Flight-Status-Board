import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FlightData } from '../types/FlightData';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';



const FlightDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [flightData, setFlightData] = React.useState<FlightData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchFlight = async () => {
            try {
                const response = await axios.get(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`);
                setFlightData(response.data);
            } catch (error) {
                setError("The requested flight details are unavailable.")
            }
        };
        fetchFlight();
    }, [id]);

    const onTablePage = () => {
        navigate(`/`);
    }

return (
    <div>
        {
            error ? (
                <p>{error}</p>
            ) : flightData ? (
                <Card body style={{textAlign: 'center'}}>
                    <h2>Flight Number: {flightData.flightNumber}</h2>
                    <p>Airline: {flightData.airline}</p>
                    <p>Origin: {flightData.origin}</p>
                    <p>Destination: {flightData.destination}</p>
                    <p>Departure Tine: {new Date(flightData.departureTime).toLocaleString()}</p>
                    <p>Status: {flightData.status}</p>
                    <button onClick={onTablePage} className='btn btn-primary'>Back to Results</button>

                </Card >
            ) : (
                <p>Loading...</p>
            )
        }
    </div>
)
}


export default FlightDetails