import React from "react";
import {FiMenu} from "react-icons/fi";
import {FaSearch} from "react-icons/fa";
import TablePagination from "@mui/material/TablePagination";
import LabTabs from "./tabs";
import MultiActionAreaCard from "./eventCard";

import BasicPopover from "./filter tab";


function eventDashboard({events, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, toggleLockButton}) {
    return (
        <div className="main center">
            <nav className="navbar flex">
                <div className="left flex">
                    <button className="sidebar-open " onClick={toggleLockButton}><FiMenu/></button>
                </div>
                <div className="middle flex">
                    <button className="search-button"><FaSearch/></button>
                    <input type="text" placeholder="Search"/>
                    <i className="space-icon"><BasicPopover/></i>
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
            <div className="content-container center">
                <div className="content-header">
                    <LabTabs/>
                </div>
                <div className="content-body flex">
                    {events.map((e, i) => <div className="card-container center">
                        <MultiActionAreaCard key={i} eventHeader={e}/>
                    </div>)
                    }
                </div>
            </div>
        </div>
    );
}
export default eventDashboard;

