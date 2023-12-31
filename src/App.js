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
import MyEvents from "./myEventsPage/myEvents";
import Ticket from "./tickets/tickets";
import Header from "./Header/Header";


function App(){
    return (
        <div className="App">
            <Router>
                <Header />
            {/*    <Routes>*/}
            {/*        <Route path={RoutePathNames.dashboard} element={<Dashboard />} />*/}
            {/*        <Route element={<RequireAuth />}>*/}
            {/*            <Route path={RoutePathNames.event} element={<Event />} />*/}
            {/*            <Route path={RoutePathNames.profile} element={<Profile />} />*/}
            {/*            <Route path={RoutePathNames.myEvents} element={<MyEvents />} />*/}
            {/*            <Route path={RoutePathNames.ticket} element={<Ticket/>} />*/}
            {/*        </Route>*/}
            {/*        <Route element={<RequireNoAuth />}>*/}
            {/*            <Route path={RoutePathNames.login} element={<Login />} />*/}
            {/*        </Route>*/}
            {/*        <Route path={RoutePathNames.validation} element={<ValidationPage />} />*/}
            {/*    </Routes>*/}
            </Router>
        </div>
    );
}

export default App;
