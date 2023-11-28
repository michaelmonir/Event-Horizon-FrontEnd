import React from 'react';
import './App.css';
import Login from './loginAndSignup/login.js';
import Profile from "./porfile/profile";
import Dashboard from './dashboard/dashboard.js';
import BasicModal from "./dashboard/event-modal";

function App() {
    return (
        <div className="App">
            <BasicModal />
            {/*<Dashboard />*/}
            {/*<Login/>*/}
        </div>
    );
}

export default App;
