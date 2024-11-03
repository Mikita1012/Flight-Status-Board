import * as React from 'react';
import axios from 'axios';
import { FlightData } from '../types/FlightData';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import FlightDetails from '../components/FlightDetails';




jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FlightDetails Component', () => {
    const mockFlightData: FlightData = {
        id: 1,
        flightNumber: 'A3B64',
        airline: 'Airline 3',
        origin: 'Origin 3',
        destination: 'Destination 3',
        departureTime: '2024-11-02T11:07:13.720Z',
        status: 'Departed'
    };

    const remderWithRouter = (ui: React.ReactElement) => {
        return render(
            <MemoryRouter initialEntries={[`/flights/${mockFlightData.id}`]}>
                <Routes>
                    <Route path="/flights/:id" element={ui} />
                    <Route path="/" element={<div>Flight List Page</div>} />
                </Routes>
            </MemoryRouter>
        );
    };


    it('should display flight details on successful fetch', async () => {
        mockedAxios.get.mockResolvedValueOnce({data: mockFlightData});

        remderWithRouter(<FlightDetails/>);
        await waitFor(() => {
            expect(screen.getByText(`Flight Number: ${mockFlightData.flightNumber}`)).toBeInTheDocument();   
        });

        const backButton = screen.getByRole('button', {name: /Back to Results/i});
        fireEvent.click(backButton);

        await waitFor(() => {
            expect(screen.getByText(/Flight List Page/)).toBeInTheDocument();
        })
    })



})