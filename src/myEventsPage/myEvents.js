import EventsDashboard from "../dashboard/EventsDashboard";
import EventApis from "../Apis/EventApis/EventApis";
import {useEffect} from "react";
import {useState} from "react";
import "./MyEvents.css";
import Button from "@mui/material/Button";
import {RoutePathNames} from "../Routes/RoutePathNames";
import {useNavigate} from "react-router-dom";


function myEvents() {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [events, setEvents] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchEvents().then(r => console.log(r));
    }, [page, rowsPerPage]);


    const fetchEvents = async () => {
        try {
            const response = await EventApis.get(`dashboard/${page}/${rowsPerPage}`);
            setEvents(response.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    return (
        <div className="myEvents">
            <Button className="btn" variant="contained" onClick={() => {
                navigate(RoutePathNames.profile);
            }}>go to profile</Button>
            <EventsDashboard
                events={events}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default myEvents;