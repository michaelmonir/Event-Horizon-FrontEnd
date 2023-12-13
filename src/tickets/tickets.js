import React from "react";
import "./tickets.css";
import {useLocation} from "react-router-dom";
import TicketsModal from "./ticketsModal";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";



function tickets() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tickets, setTickets] = React.useState([{ "name": "ticket1", "price": 100, "description": "hjbdslhjbemp ip dum" },
        { "name": "ticket2", "price": "200", "description": "ticket2" },{ "name": "ticket1",  "price": 100, "description": "ticket1" },
        { "name": "ticket1",  "price": 100, "description": "ticket1" },
        { "name": "ticket1",  "price": 100, "description": "ticket1" },
        { "name": "ticket1", "price": 100, "description": "ticket1" },
        { "name": "ticket1", "price": 100, "description": "ticket1" },
    ]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    const params = location.state;
    const id = params.id
    return <div className="tickets-container">
        <div className="tickets-title"><span>Tickets available</span> </div>
        <div className="tickets-body"
        >
            {tickets.map((ticket) => {
                    return <div className="ticket">
                        <div className="ticket-header">
                            <span className="ticket-title">{ticket.name} : </span>
                            <span className="ticket-price"> {ticket.price} $$</span>
                        </div>
                        <div className="ticket-body">
                            <span className="ticket-description">{ticket.description}</span>
                        </div>
                    </div>
                }
            )}
        </div>
        <TicketsModal tickets={tickets}/>
        <Button variant="contained" style={ {position: "absolute", top: "70px", right: "40px",}}
                onClick={() => {
                    navigate("/event", {state: {id: id}})
                }
                }
        >Return To Event</Button>

    </div>

}
export default tickets;