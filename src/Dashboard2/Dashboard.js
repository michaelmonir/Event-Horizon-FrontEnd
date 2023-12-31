import React, {useState, useEffect} from 'react';
import "./Dashboard.css";
import TablePagination from "@mui/material/TablePagination";
import Tabs from "./Tabs";
import BasicModal from "../EventModal/event-modal";
import EventDashBoardCard from "./EventDashboardCard";
import Filter from "./Filter";
import EventApis from "../Apis/EventApis/EventApis";
import {useMyContext} from "../Authentication/LogInContext";
import {getBackEndCallingFunction} from "./DashboardTypes";

export default function Dashboard({viewComponentIndex}) {

    const { getUserId } = useMyContext();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tabIndex, setTabIndex] = React.useState("1");
    const [data, setData] = React.useState([]);
    const getDtoListFromBackEnd = async (filters) => {
        try {
            const response = await getBackEndCallingFunction(filters, viewComponentIndex, page, rowsPerPage,tabIndex, getUserId())
            setData(response.data);
        }
        catch (error) {
            alert(error.response.data.message)
        }
    }
    const emptyFilters={filters: []}
    useEffect(() => {
        getDtoListFromBackEnd(emptyFilters);
    }, [page]);
    useEffect(() => {
        getDtoListFromBackEnd(emptyFilters);
    }, [rowsPerPage]);
    useEffect(() => {
        getDtoListFromBackEnd(emptyFilters);
    }, [tabIndex]);


    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    return <div className="dashboard">
        <div className="main center">
            <nav className="navbar flex">
                <div className="middle flex">
                    <div className="dashboard-title">Dashboard</div>
                    <i className="space-icon">
                        <Filter
                            getDtoListFromBackEnd={getDtoListFromBackEnd}
                        />
                    </i>
                </div>
                <div className="right flex">
                    <div className="content-header-breadcrumb">
                        <TablePagination
                            component="div"
                            count={data.length}
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
                    <Tabs setTabIndex={setTabIndex}/>
                </div>

                <div className="content-body flex">
                    {
                        data.map((d, i) =>
                            <div className="card-container center">
                                <EventDashBoardCard eventHeader={d} key={i} />
                            </div>)
                    }
                </div>
                <BasicModal  buttonName="Create Event" handleSubmitFunction={async(event)=>{
                    EventApis.post("createEvent/" + getUserId(), event)
                }}/>
            </div>
        </div>
    </div>
}