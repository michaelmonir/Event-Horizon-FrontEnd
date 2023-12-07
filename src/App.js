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
import {RoutePathNames} from "./Routes/RoutePathNames";
import Button from "@mui/material/Button";
import EventApis from "./Apis/EventApis/EventApis";
import {getUserId, getUserToken} from "./Authentication/UserAuthentication";


function App(){
    // const handleClick = async() => {
    //     const event = {
    //         "id":101,
    //         "name":"myevent50"
    //     }
    //     try {
    //         const config = {
    //             headers: { Authorization: `Bearer ${getUserToken()}` }
    //         };
    //         console.log(config)
    //         const response =
    //             await EventApis.post("createEvent/" + getUserId(), event)
    //         alert("ok")
    //     }
    //     catch (error)
    //     {
    //         alert("not ok")
    //     }
    // }
    return (
        <div className="App">
            {/*<Button onClick={handleClick}>Butonnnnnnnnnnnnnnnnnnnnnnn</Button>*/}
            <Router>
                <Routes>
                    <Route path={RoutePathNames.dashboard} element={<Dashboard />} />
                    <Route element={<RequireAuth />}>
                        <Route path={RoutePathNames.event} element={<Event />} />
                        <Route path={RoutePathNames.profile} element={<Profile />} />
                    </Route>
                    <Route element={<RequireNoAuth />}>
                        <Route path={RoutePathNames.login} element={<Login />} />
                        <Route path={RoutePathNames.validation} element={<ValidationPage />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
