import React, {useState, useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";

import './App.css';
import Login from './loginAndSignup/login.js';
import Profile from "./porfile/profile";
import Dashboard from './dashboard/dashboard.js';
import ValidationPage from "./validation/validationPage";
import Event from "./event/event";

function App() {



    const LOCAL_STORAGE_KEY = "token";
    const LOCAL_STORAGE_KEY_ID = "id";

    const [token, setToken] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);
    const [id, setId] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ID)) ?? []);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));
    }, [token]);
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_ID, JSON.stringify(id))
    }, [id]);

    return (
        <div className="App">
            {/*<Dashboard />*/}
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/validation" element={<ValidationPage/>}/>
                    <Route path="/event/:id" render={({ match }) => <Event id={match.params.id} />} />
                    <Route path="/event" element={<Event/>}/>
                </Routes>
            </Router>

        </div>
    );
}

export default App;
