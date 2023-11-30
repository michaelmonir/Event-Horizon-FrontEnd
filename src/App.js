import React, {useState, useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";

import './App.css';
import Login from './loginAndSignup/login.js';
import Profile from "./porfile/profile";
import Dashboard from './dashboard/dashboard.js';
import ValidationPage from "./validation/validationPage";
import Event from "./event/event";
import RequireAuth from "./Authentication/RequireAuth";
import RequireNoAuth from "./Authentication/ReruireNoAuth";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/event" element={<Event />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route element={<RequireNoAuth />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/validation" element={<ValidationPage />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
