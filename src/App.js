import React ,{useState,useEffect} from 'react';
import './App.css';
import Login from './loginAndSignup/login.js';
import Profile from "./porfile/profile";
import Dashboard from './dashboard/dashboard.js';
import BasicModal from "./dashboard/event-modal";
import ValidationPage from "./validation/validationPage";
import Event from "./event/event";

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



    const LOCAL_STORAGE_KEY = "token";

    const [token, setToken] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));
    }, [token]);

    return (
        <div className="App">
            {/*<BasicModal />*/}
            {/*<Dashboard />*/}
            <Login/>
            
        </div>
    );
}

export default App;
