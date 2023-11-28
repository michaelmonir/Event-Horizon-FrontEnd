import React from "react";
import "./event.css";
import Button from "@mui/material/Button";
import {FaPen} from "react-icons/fa6";
import "../dashboard/dashboard.css";
import UpdateModal from "./event-update-modal";

function Event(props) {
    const {
        id,
        name,
        description,
        eventCategory,
        eventDate,
        eventAds,
        eventLocation,
        organizerHeader
    } = props.event;
    const {
        Country,
        City,
        Street,
    } = eventLocation;
    return <div className="event">
        <div className="event-header">
            <div className="event-header-title">
                <span>{name}</span>
            </div>
            <div className="event-header-content">
                <UpdateModal/>
            </div>
        </div>
        <div className="event-body">
            <div className="event-body-title">
                <span>Made by : {organizerHeader.name}</span>
            </div>
            <div className="event-content">
                <div className="event-location">
                    <span>Location: </span>
                    <span>
                        {Country}, {City}, {Street}
                    </span>
                </div>
                <div className="event-category">
                    <span>Category: </span>
                    <span>{eventCategory}</span>
                </div>
                <div className="event-ads">
                    <span>Ads: </span>
                    <span>{eventAds.name}</span>
                </div>
                <div className="event-date">
                    <span>Date: </span>
                    <span>{eventDate}</span>
                </div>
                <div className="event-ticket">
                    <span>Ticket: </span>
                    <span>To be continued</span>
                </div>
                <div className="event-description">
                    <span>Description: </span>
                    <span>{description}</span>
                </div>
            </div>
        </div>
    </div>
}

export default Event;