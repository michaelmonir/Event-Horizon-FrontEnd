import React from "react";
import "./event.css";

function EventBodyAttribute({label, value}) {
    return <div className="event-title">
        <span>{label}</span>
        <span className="event-desc">{value}</span>
    </div>
}
export default EventBodyAttribute;