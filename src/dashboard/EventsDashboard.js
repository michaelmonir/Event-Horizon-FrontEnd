import React from "react";
import {FiMenu} from "react-icons/fi";
import {FaSearch} from "react-icons/fa";
import TablePagination from "@mui/material/TablePagination";
import LabTabs from "./tabs";
import MultiActionAreaCard from "./eventCard";

import BasicPopover from "./filter tab";


function eventDashboard({events,setTabIndex}) {
    return (
        <div className="main">
            <div className="content-container center">
                <div className="content-header">
                    <LabTabs setTabIndex={setTabIndex}/>
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

