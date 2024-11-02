import * as React from 'react';
import { FlightData } from '../types/FlightData';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface FlightDataProps {
    flightData: FlightData[]
    // onRowClick: (id: number) => void
}

const Flights: React.FC<FlightDataProps> = ({ flightData }) => {
    // console.log(flightData.id);
    const navigate = useNavigate();
    const handleRowClick = (id: number) => {
        navigate(`/flights/${id}`)
    }

    return (
        <>
            <div className="container">
                {/* <h2>Flight Status</h2> */}
                <Table className="table table-striped responsive">
                    <thead>
                        <tr>
                            <th>Flight Number</th>
                            <th>Airline</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Departure Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flightData.map((flight) => (

                            <tr key={flight.id} onClick={() => handleRowClick(flight.id)} style={{cursor: 'pointer'}}>

                                <td>{flight.flightNumber}</td>
                                <td>{flight.airline}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td>{new Date(flight.departureTime).toLocaleString()}</td>
                                <td>{flight.status}</td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </div>

        </>



    )
}


export default Flights;