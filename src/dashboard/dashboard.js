import React, {useEffect, useState} from 'react';
import "./dashboard.css";
import {FaLock, FaUnlock} from "react-icons/fa";
import {GiRamProfile} from "react-icons/gi";
import BasicModal from "./EventModal/event-modal";
import EventApis from "../Apis/EventApis/EventApis";
import {Link} from "react-router-dom";
import {getUserId, isTheUserAnOrganizer} from "../Authentication/UserAuthentication";
import EventDashboard from "./EventsDashboard";
import FilterApis from "../Apis/EventApis/FilterApis";


function Dashboard() {


    const [name, setName] = React.useState("");
    const [eventCategory, setEventCategory] = React.useState("");
    const [eventSubCategory, setEventSubCategory] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [statesInCountry, setStatesInCountry] = React.useState([]);
    const [organizerName, setOrganizerName] = React.useState("");
    const [sidebarClass, setSidebarClass] = useState("sidebar hover closed");
    const [sidebarLocked, setSidebarLocked] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [events, setEvents] = React.useState([]);
    const [tabIndex, setTabIndex] = React.useState(0);

    useEffect(() => {
        modifyPages().then(r => console.log(r));// Access the updated value here
    }, [page]);
    useEffect(() => {
        modifyPages().then(r => console.log(r));// Access the updated value here
    }, [rowsPerPage]);

    useEffect(() => {
        modifyPages().then(r => console.log(r));// Access the updated value here
    }, [tabIndex]);

    useEffect(() => {
        modifyPages().then(r => console.log(r));// Access the updated value here
    }, [tabIndex]);

    useEffect(() => {
        setTabIndex('1');
    }, []);

    function SidebarOpen() {
        if (sidebarLocked) return;
        setSidebarClass("sidebar opened hover");
    }

    function SidebarClose() {
        if (sidebarLocked) return;
        setSidebarClass("sidebar closed hover");
    }

    function toggleLockButton() {
        setSidebarLocked(!sidebarLocked)
        if (!sidebarLocked) {
            setSidebarClass("sidebar locked");
        } else {
            setSidebarClass("sidebar hover closed");
        }
    }

    const responseFunction = (event) => {
        return EventApis.post("createEvent/" + getUserId(), event)
    }
    const modifyPages = async () => {
        // const filterDto = {
        //     filters: [
        //         {
        //             "first": "NAME",
        //             "second": "AND",
        //             "third": name
        //         },
        //         {
        //             "first": "ADDRESS",
        //             "second": "AND",
        //             "third": address
        //         },
        //         {
        //             "first": "COUNTRY",
        //             "second": "AND",
        //             "third": country
        //         },
        //         {
        //             "first": "CITY",
        //             "second": "AND",
        //             "third": state
        //         },
        //         {
        //             "first": "CATEGORY",
        //             "second": "AND",
        //             "third": eventCategory + "-" + eventSubCategory
        //         },
        //         {
        //             "first": "ORGANIZER",
        //             "second": "AND",
        //             "third": organizerName
        //         }
        //     ]
        // }
        // console.log(filterDto);
        // try {
        //     let response;
        //     if (tabIndex !== '1') {
        //         response = await FilterApis.post("draftedForOrganizer/" + page + "/" + rowsPerPage + "/" + getUserId(), filterDto);
        //     } else {
        //         response = await FilterApis.post("dashboard/" + page + "/" + rowsPerPage, filterDto);
        //     }
        //     setEvents(response.data);
        // } catch (error) {
        //     alert(error.response.data.message)
        // }
    }
    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        modifyPages().then(r => console.log(r));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        modifyPages().then(r => console.log(r));
    };


    return <div className="dashboard">
        <nav className={sidebarClass} onMouseEnter={SidebarOpen} onMouseLeave={SidebarClose}>
            <div className="sidebar-header flex ">
                <div className="sidebar-logo"></div>
                <span className="sidebar-title">EventHorizon</span>
                <i className="sidebar-open" title="Lock the sidebar" onClick={toggleLockButton}>
                    {sidebarLocked ? <FaLock/> : <FaUnlock/>}
                </i>

            </div>
            {Array(3).fill(0).map(() => {
                return <div className="sidebar-body">
                    <ul className="sidebar-menu">
                        <div className="sidebar-menu-title flex">
                            <span className="sidebar-menu-text">Menu</span>
                            <span className="underline"></span>
                        </div>
                        <li className="sidebar-menu-item">
                            <a href="#" className="sidebar-menu-link flex ">
                                <i className="sidebar-menu-icon center">X</i>
                                <span className="sidebar-menu-text">Dashboard</span>
                            </a>
                        </li>
                        <li className="sidebar-menu-item">
                            <a href="#" className="sidebar-menu-link flex ">
                                <i className="sidebar-menu-icon center">X</i>
                                <span className="sidebar-menu-text">Dashboard</span>
                            </a>
                        </li>
                    </ul>
                </div>
            })}
            <div className="sidebar-profile-container flex">
                <div className="sidebar-profile flex">
                    <Link to={"/profile"} className="flex"><GiRamProfile/></Link>
                    <div className="sidebar-profile-info">
                        <span className="sidebar-profile-name">User</span>
                    </div>
                </div>
            </div>
        </nav>
        <EventDashboard events={events} page={page}
                        rowsPerPage={rowsPerPage} handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        toggleLockButton={toggleLockButton}
                        name={name} address={address} country={country} state={state} eventCategory={eventCategory} eventSubCategory={eventSubCategory} organizerName={organizerName}
                        setName={setName} setAddress={setAddress} setCountry={setCountry} setState={setState} setEventCategory={setEventCategory} setEventSubCategory={setEventSubCategory} setOrganizerName={setOrganizerName}
                        statesInCountry={statesInCountry} setStatesInCountry={setStatesInCountry}
                        modifyPages={modifyPages}
                        setTabIndex={setTabIndex}
        />

        { isTheUserAnOrganizer() ? <BasicModal responseFunction={responseFunction} buttonName="Create Event"/> : null }
    </div>
}

export default Dashboard;