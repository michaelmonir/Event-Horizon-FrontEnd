import React from 'react';
import './App.css';
import Login from './loginAndSignup/login.js';
import Profile from "./porfile/profile";
import Dashboard from './dashboard/dashboard.js';
import BasicModal from "./dashboard/event-modal";

function App() {


    const profileAttributes = {
        firstName: "jooooooon",
        lastName: "Doe",
        email: "Doe@gmail.com",
        gender: "male",
        paypalAccount: "paypal@gmail.com",
        userName : "said",
        role : "Client"
    };


    return (
        <div className="App">
            <Profile profileAttributes={profileAttributes} />
            {/*<Dashboard />*/}
            {/*<Login/>*/}
        </div>
    );
}

export default App;
