import React, {useState, useEffect} from 'react';
import "./dashboard.css";
import {FaUnlock, FaLock} from "react-icons/fa";
import {GiRamProfile} from "react-icons/gi";
import BasicModal from "./EventModal/event-modal";
import EventApis from "../Apis/EventApis/EventApis";
import {Link} from "react-router-dom";
import {isTheUserAnOrganizer} from "../Authentication/UserAuthentication";
import EventDashboard from "./EventsDashboard";
import FilterApis from "../Apis/EventApis/FilterApis";


function Dashboard() {

    const [sidebarClass, setSidebarClass] = useState("sidebar hover closed");
    const [sidebarLocked, setSidebarLocked] = useState(false);

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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [events, setEvents] = React.useState([]);
    useEffect(() => {
        modifyPages().then(r => console.log(r));// Access the updated value here
    }, [page]);
    useEffect(() => {
        modifyPages().then(r => console.log(r));// Access the updated value here
    }, [rowsPerPage]);

    const filterDto={
        filters:[

        ]
    }
    const modifyPages = async () => {

        try {
            const response = await FilterApis.post("dashboard/" + 0 + "/" + 50, filterDto);
            setEvents(response.data);
        } catch (error) {
            alert(error.response.data.message)
        }
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
                        toggleLockButton={toggleLockButton}/>

        { isTheUserAnOrganizer() ? <BasicModal/> : null }
    </div>
}

export default Dashboard;