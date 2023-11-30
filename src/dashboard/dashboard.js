import React, {useState,useEffect} from 'react';
import "./dashboard.css";
import {FaUnlock, FaLock, FaSearch} from "react-icons/fa";
import {FiMenu} from "react-icons/fi";
import {GiRamProfile} from "react-icons/gi";
import {FaShuttleSpace} from "react-icons/fa6";
import TablePagination from '@mui/material/TablePagination';
import MultiActionAreaCard from "./eventCard";
import BasicModal from "./event-modal";
import EventApis from "../Apis/EventApis/EventApis";
import {Link} from "react-router-dom";


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
        modifyPages();// Access the updated value here
    }, [page]);
    useEffect(() => {
        modifyPages();// Access the updated value here
    }, [rowsPerPage]);
    const modifyPages= async ()=>{

        try {
            const response = await EventApis.get("dashboard/" + page + "/" + rowsPerPage);
            setEvents(response.data);
        }
        catch(error) {
            alert(error.response.data.message)
        }
    }
    const handleChangePage = async(event, newPage) =>  {
        setPage(newPage);
        modifyPages();
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        modifyPages();
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
            {/* eslint-disable-next-line array-callback-return */}
            {Array(3).fill(0).map(() => {
                return <div className="sidebar-body">
                    <ul className="sidebar-menu">
                        <div className="sidebar-menu-title flex">
                            <span className="sidebar-menu-text">Menu</span>
                            <span className="underline"></span>
                        </div>
                        <li className="sidebar-menu-item">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#" className="sidebar-menu-link flex ">
                                <i className="sidebar-menu-icon center">X</i>
                                <span className="sidebar-menu-text">Dashboard</span>
                            </a>
                        </li>
                        <li className="sidebar-menu-item">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link to={"/profile"} className="flex"><GiRamProfile/></Link>
                    <div className="sidebar-profile-info">
                        <span className="sidebar-profile-name">User</span>
                        {/*<sub className="sidebar-profile-position">Profile</sub>*/}
                    </div>
                </div>
            </div>
        </nav>

        <div className="main center">
            <nav className="navbar flex">
                <div className="left flex">
                    <button className="sidebar-open " onClick={toggleLockButton}><FiMenu/></button>
                </div>
                <div className="middle flex">
                    <button className="search-button"><FaSearch/></button>
                    <input type="text" placeholder="Search"/>
                    <i className="space-icon"><FaShuttleSpace/></i>
                </div>
                <div className="right flex">
                    <div className="content-header-breadcrumb">
                        <TablePagination
                            component="div"
                            count={100}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </nav>
            <div className="content-container center">
                <div className="content-body flex">
                    {events.map((e, i) => <div className="card-container center">
                        <MultiActionAreaCard key={i} eventHeader={e}/>
                    </div>)
                    }
                </div>
            </div>
        </div>
        <BasicModal/>
    </div>
}

export default Dashboard;