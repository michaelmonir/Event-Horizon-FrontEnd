import React, {useState} from 'react';
import "./dashboard.css";
import {FaUnlock, FaLock, FaSearch} from "react-icons/fa";
import {FiMenu} from "react-icons/fi";
import {GiRamProfile} from "react-icons/gi";
import {FaShuttleSpace} from "react-icons/fa6";


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
        if(!sidebarLocked){
            setSidebarClass("sidebar locked");
        }
        else{
            setSidebarClass("sidebar hover closed");
        }
    }


    return <div className="dashboard">
        <nav className={sidebarClass} onMouseEnter={SidebarOpen} onMouseLeave={SidebarClose}>
            <div className="sidebar-header flex">
                <div className="sidebar-logo"></div>
                <span className="sidebar-title">EventHorizon</span>
                <i className="sidebar-open" title="Lock the sidebar" onClick={toggleLockButton}>
                    {sidebarLocked ? <FaLock/> : <FaUnlock/>}
                </i>

            </div>
            <div className="sidebar-body">
                <ul className="sidebar-menu">
                    <div className="sidebar-menu-title flex">
                        <span className="sidebar-menu-text">Menu</span>
                        <span className="underline"></span>
                    </div>
                    <li className="sidebar-menu-item">
                        <a href="#" className="sidebar-menu-link flex active">
                            <i>X</i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="sidebar-menu-item">
                        <a href="#" className="sidebar-menu-link flex active">
                            <i className="sidebar-menu-icon">X</i>
                            <span className="sidebar-menu-text">Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="sidebar-body">
                <ul className="sidebar-menu">
                    <div className="sidebar-menu-title flex">
                        <span className="sidebar-menu-text">Menu</span>
                        <span className="underline"></span>
                    </div>
                    <li className="sidebar-menu-item">
                        <a href="#" className="sidebar-menu-link flex active">
                            <i>X</i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="sidebar-menu-item">
                        <a href="#" className="sidebar-menu-link flex active">
                            <i className="sidebar-menu-icon">X</i>
                            <span className="sidebar-menu-text">Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="sidebar-body">
                <ul className="sidebar-menu">
                    <div className="sidebar-menu-title flex">
                        <span className="sidebar-menu-text">Menu</span>
                        <span className="underline"></span>
                    </div>
                    <li className="sidebar-menu-item">
                        <a href="#" className="sidebar-menu-link flex active">
                            <i>X</i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="sidebar-menu-item">
                        <a href="#" className="sidebar-menu-link flex active">
                            <i className="sidebar-menu-icon">X</i>
                            <span className="sidebar-menu-text">Menu</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="sidebar-profile-container">
                <div className="sidebar-profile flex">
                    <a><GiRamProfile/></a>
                    <div className="sidebar-profile-info">
                        <span className="sidebar-profile-name">Youssef</span>
                        <sub className="sidebar-profile-position">Admin</sub>
                    </div>
                </div>
            </div>
        </nav>
        <nav className="navbar flex">
            <div className="left">
                <button className="sidebar-open" onClick={toggleLockButton}><FiMenu/></button>
            </div>
            <div className="middle">
                <button><FaSearch/></button>
                <input type="text" placeholder="Search"/>
                <i><FaShuttleSpace/></i>
            </div>
            <div></div>
        </nav>
    </div>
}

export default Dashboard;