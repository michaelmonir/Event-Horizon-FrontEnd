import React, {useEffect} from "react";
import "./event.css";
import "../dashboard/dashboard.css";
import EventApis from "../Apis/EventApis/EventApis";
import { useLocation } from 'react-router-dom';

function Event() {

    const [attributes, setAttributes] = React.useState({
            "name":"",
            "description":"",
            "eventCategory":"",
            "eventDate":"",
            "eventAds":"",
            "eventLocation":{
                "country":"",
                "city":"",
                "address":""
            },
            "eventOrganizer":{
                "id":0,
                "name":""
            }
        });
    const location = useLocation();
    const params = location.state;
    const id = params.id


    const f = async() => {
        try {
            const response = await EventApis.get("eventForUser/"+id);
            alert(JSON.stringify(response.data))
            setAttributes(response.data)
        } catch (error) {
            alert("not Found")
        }
    }

    useEffect(() => {
        f()
    }, []);

    return <div className="event">
        <div className="event-header">
            <div className="event-header-title">
                <span>{attributes.name}</span>
            </div>
            {/*next phase*/}
            {/*<div className="event-header-content">*/}
            {/*    <UpdateModal/>*/}
            {/*</div>*/}
        </div>
        <div className="event-body">
            <div className="event-body-title">
                <span>Made by : {attributes.eventOrganizer.name}</span>
            </div>
            <div className="event-content">
                <div className="event-location">
                    <span>Location: </span>
                    <span>
                        {attributes.eventLocation.country}, {attributes.eventLocation.city}, {attributes.eventLocation.address}
                    </span>
                </div>
                <div className="event-category">
                    <span>Category: </span>
                    <span>{attributes.eventCategory}</span>
                </div>
                {/*<div className="event-ads">*/}
                {/*    <span>Ads: </span>*/}
                {/*    <span>{attributes.eventAds.name}</span>*/}
                {/*</div>*/}
                <div className="event-date">
                    <span>Date: </span>
                    <span>{attributes.eventDate}</span>
                </div>
                <div className="event-description">
                    <span>Description: </span>
                    <span>{attributes.description}</span>
                </div>
            </div>
        </div>
    </div>
}

export default Event;