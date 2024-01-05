import *  as React from 'react';

import {FiMenu} from "react-icons/fi";
import {FaSearch} from "react-icons/fa";
import TablePagination from "@mui/material/TablePagination";
import LabTabs from "./tabs";
import BasicPopover from "./filter tab";

export default function NavBar({events, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, toggleLockButton,
                                  name, setName,
                                  eventCategory, setEventCategory,
                                  eventSubCategory, setEventSubCategory,
                                  country, setCountry,
                                  state, setState,
                                  address, setAddress,
                                  statesInCountry, setStatesInCountry,
                                  organizerName, setOrganizerName,
                                  modifyPages
}){

    return (
        <nav className="navbar flex">
            <div className="left flex">
                <button className="sidebar-open " onClick={toggleLockButton}><FiMenu/></button>
                <div className="sidebar-header flex ">
                    <div className="sidebar-logo"></div>
                    <span className="sidebar-title">Event Horizon</span>
                </div>
            </div>
            <div className="middle flex">
                <button className="search-button"><FaSearch/></button>
                <input type="text" placeholder="Search"/>
                <i className="space-icon"><BasicPopover
                    name={name} address={address} country={country} state={state} eventCategory={eventCategory}
                    eventSubCategory={eventSubCategory} organizerName={organizerName}
                    setName={setName} setAddress={setAddress} setCountry={setCountry} setState={setState}
                    setEventCategory={setEventCategory} setEventSubCategory={setEventSubCategory}
                    setOrganizerName={setOrganizerName}
                    statesInCountry={statesInCountry} setStatesInCountry={setStatesInCountry}
                    modifyPages={modifyPages}
                /></i>
            </div>
            <div className="right flex">
                <div className="content-header-breadcrumb">
                    <TablePagination
                        component="div"
                        count={events.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </nav>
    );
}