import React, {useEffect} from "react";
import "./event.css";
import "../dashboard/dashboard.css";
import EventApis from "../Apis/EventApis/EventApis";
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {RoutePathNames} from "../Routes/RoutePathNames";
import EventBodyAttribute from "./event-body-attribute";


function Event() {
    const navigate = useNavigate();
    const [attributes, setAttributes] = React.useState({
        "name": "",
        "description": "",
        "eventCategory": "",
        "eventDate": "",
        "eventAds": "",
        "eventLocation": {
            "country": "",
            "city": "",
            "address": ""
        },
        "eventOrganizer": {
            "id": 0,
            "name": ""
        }
    });
    const location = useLocation();
    const params = location.state;
    const id = params.id


    const fetchEvents = async () => {
        try {
            const response = await EventApis.get("eventForUser/" + id);
            setAttributes(response.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, []);
    return <div className="event-container">
        <div className="dashboard-back-button">
            <Button variant={"contained"} onClick={() => {
                navigate(RoutePathNames.dashboard)
            }}>back to dashboard </Button>
        </div>
        <div className="event">
            <div className="event-header">
                <div className="event-header-center">
                    <span className="event-organizer">{attributes.eventOrganizer.name}</span>
                    <span>represents</span>
                </div>
            </div>
            <div className="event-body">
                <EventBodyAttribute label={"Event Name"} value={attributes.name}/>
                <EventBodyAttribute label={"Event Category"} value={attributes.eventCategory}/>
                <EventBodyAttribute label={"Event Date"} value={attributes.eventDate}/>
                <EventBodyAttribute label={"Event Ads"} value={attributes.eventAds}/>
                <EventBodyAttribute label={"Event Location"} value={attributes.eventLocation.country + " , " + attributes.eventLocation.city + " , " + attributes.eventLocation.address}/>
                <Button variant={"outlined"} onClick={() => {
                    navigate(RoutePathNames.ticket, {state: {id: id}})
                }}>Buy Ticket</Button>
                <div className="event-description">
                    <span>{attributes.description}</span>
                </div>
            </div>
        </div>
    </div>
}

export default Event;