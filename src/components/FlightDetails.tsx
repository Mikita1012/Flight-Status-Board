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
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            {
                error ? (
                    <p style={{color: 'red', textAlign: 'center'}}>{error}</p>
                ) : flightData ? (
                    <Card body className='text-center shadow-lg p-4 m-5 bg-white rounded' style={{ textAlign: 'center' }}>
                        <h2 style={{color: '#007bff', fontWeight: 'bold'}}>Flight Number: {flightData.flightNumber}</h2> <hr/>
                        <p><strong>Airline:</strong> {flightData.airline}</p>
                        <p><strong>Origin:</strong> {flightData.origin}</p>
                        <p><strong>Destination:</strong> {flightData.destination}</p>
                        <p><strong>Departure Time:</strong>{new Date(flightData.departureTime).toLocaleString()}</p>
                        <p><strong>Status:</strong> {flightData.status}</p>
                        <Button onClick={onTablePage} className='btn btn-primary'>Back to Results</Button>

                    </Card >
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}


export default FlightDetails