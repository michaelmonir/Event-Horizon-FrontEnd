import React from "react";
import "./event.css";
import Button from "@mui/material/Button";
import {FaPen} from "react-icons/fa6";
import "../dashboard/dashboard.css";
import UpdateModal from "./event-update-modal";

function Event() {
    return <div className="event">
        <div className="event-header">
            <div className="event-header-title">
                <span>event name here</span>
            </div>
            <div className="event-header-content">
                   <UpdateModal/>
            </div>
        </div>
        <div className="event-body">
            <div className="event-body-title">
                <span>Made by: Mohammad</span>
            </div>
            <div className="event-content">
                <div className="event-location">
                    <span>Location: </span>
                    <span> location here</span>
                </div>
                <div className="event-date">
                    <span>Date: </span>
                    <span> date here</span>
                </div>
                <div className="event-ticket">
                    <span>Ticket: </span>
                    <span>ticket here</span>
                </div>
                <div className="event-description">
                    <span>Description: </span>
                    <span>description here</span>
                </div>

            </div>
        </div>
    </div>
}

export default Event;