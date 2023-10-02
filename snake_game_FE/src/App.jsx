import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

import LoginPage from './pages/LoginPage/index';
import HomePage from './pages/HomePage/index';
import GamePage from './pages/GamePage/index';
import NavBar from './components/NavBar';

const App = () => {

    useEffect(() => {
        setTimeout(() => {
            setNotification(false);
        }, 10000);
    }, []);

    const isAuth = Boolean(useSelector((state) => state.auth.token));
    const [notification, setNotification] = useState(true);

    return (
        <div>
            <NavBar />
            {notification &&
                <Alert severity="info">Please do wait for few seconds for the first login/register as backend is hosted on a free hosting service the free instance types will spin down with inactivity.</Alert>
            }
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
                    <Route path="/game" element={isAuth ? <GamePage /> : <Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;