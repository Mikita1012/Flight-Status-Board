import * as React from 'react';
import { FlightData } from '../types/FlightData';

interface FlightDataProps {
    flightData: FlightData
}

const Flights: React.FC<FlightDataProps> = ({ flightData }) => {
    // console.log(flightData.id);

    return (
        <>
           
            <tr>
                <td>{flightData.flightNumber}</td>
                <td>{flightData.airline}</td>
                <td>{flightData.origin}</td>
                <td>{flightData.destination}</td>
                <td>{flightData.departureTime}</td>
                <td>{flightData.status}</td>
            </tr>
        </>



    )
}


export default Flights;