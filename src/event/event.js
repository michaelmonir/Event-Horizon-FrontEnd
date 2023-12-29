import React, {useEffect, useState} from "react";
import "./event.css";
import "../dashboard/dashboard.css";
import EventApis from "../Apis/EventApis/EventApis";
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {RoutePathNames} from "../Routes/RoutePathNames";
import EventBodyAttribute from "./event-body-attribute";
import {getUserId} from "../Authentication/UserAuthentication";
import BasicModal from "../dashboard/EventModal/event-modal";


function Event() {

    const updateResponseFunction = (event) => {
        return EventApis.put("updateEvent/" + getUserId() , event)
    }

    const navigate = useNavigate();
    const [attributes, setAttributes] = React.useState({
        name: "",
        description: "",
        eventCategory: "",
        eventDate: "",
        eventAds: "",
        eventLocation: {
           country: "",
            city: "",
            address: ""
        },
        eventOrganizer: {
            id: 0,
            name: ""
        },
        eventType: ""
    });
    const location = useLocation();
    const params = location.state;
    // let id = params.id

    const[id,setId] =useState(params.id);

    const handleLaunchEvent = async() => {
        try {
            const response = await EventApis.put("launchEvent/" + getUserId() + "/" + id);
            const params = {
                id: response.data.id,
            };
            // const newId = response.data.id;
            // setId(newId);
            navigate(RoutePathNames.dashboard)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const fetchEvents = async () => {
        try {
            const response = await EventApis.get("eventForUser/" + id);
            const newId = response.data.id;
            console.log(response.data)
            setId(newId);
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
                <EventBodyAttribute label={"Event Ads"} value={attributes.eventAds.name}/>
                <EventBodyAttribute label={"Event Location"}
                                    value={attributes.eventLocation.country
                                        + " , " + attributes.eventLocation.city
                                        + " , " + attributes.eventLocation.address}/>
                <EventBodyAttribute label={"Event Organizer"} value={attributes.eventOrganizer.name}/>
                <EventBodyAttribute label={"Event Type"} value={attributes.eventType}/>
                <div className="event-description">
                    <span>{attributes.description}</span>
                </div>
                <Button variant={"outlined"} onClick={() => {
                    navigate(RoutePathNames.ticket, {state: {eventId: id}})
                }}>Buy Ticket</Button>

                <Button variant={"outlined"} onClick={handleLaunchEvent}>Launch Event</Button>

                {( (attributes.eventType === "DRAFTEDEVENT") ?
                <BasicModal eventId={id} responseFunction={updateResponseFunction} buttonName="Update Event"/>
                : null )}
            </div>
        </div>
    </div>
}

export default Event;