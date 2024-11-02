// {"id":3,"flightNumber":"A3B64","airline":"Airline 3","origin":"Origin 3","destination":"Destination 3","departureTime":"2024-11-02T11:07:13.720Z","status":"Departed"}

export interface FlightData {
    id: number;
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    status: string;
}