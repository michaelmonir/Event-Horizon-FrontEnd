import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {RoutePathNames} from "../Routes/RoutePathNames";


function MultiActionAreaCard(props) {
    let eventHeader = props.eventHeader;
    const navigate = useNavigate();

    const handleSeeMore = () => {
        const params = {
            id: eventHeader.id,
        };
        navigate(RoutePathNames.event, { state: params });
    }

    return (
        <Card className="card" style={{width: "90%", transition: "all 0.2s ease-in-out"}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <div className="card-header">
                            <div className="event-name">
                                {eventHeader.name}
                            </div>
                            <div className="event-date">
                                {eventHeader.eventDate}
                            </div>
                        </div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div className="card-content">
                            <div className="event-category">
                                event: {eventHeader.eventCategory}
                            </div>
                            <div className="location">
                                Location: {eventHeader.eventLocation.country}, {eventHeader.eventLocation.city}, {eventHeader.eventLocation.address}
                            </div>
                        </div>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div className="card-footer">
                    <Button size="small" color="primary" onClick={handleSeeMore}>
                        see more
                    </Button>
                    <div className="Organizer-name">
                        made by: {eventHeader.eventOrganizer.name}
                    </div>
                </div>
            </CardActions>
        </Card>
    );

}

export default MultiActionAreaCard;
