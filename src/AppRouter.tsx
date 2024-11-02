import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import App from './App';
import FlightDetails from './components/FlightDetails';


const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/flights/:id' element={<FlightDetails />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter