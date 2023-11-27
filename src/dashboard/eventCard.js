import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

 function MultiActionAreaCard() {
    return (
        <Card  className="card" style={{width: "90%", transition:"all 0.2s ease-in-out"}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica and some oceanic island chains like Hawaii.
                        the species is the Komodo dragon, it is not the largest extant species of lizard.
                        This is the American alligator, which can attain lengths of 5.5 m (18 ft) as an adult.
                        The extinct aquatic mosasaurs reached 17 m (56 ft), and the giant monitor Megalania is estimated to have reached perhaps 7 m (23 ft).
                        However, large varanids are known from the fossil record, including the Miocene Saniwa which reached lengths of 3.5 m (11 ft).
                        The Komodo dragon is the largest living lizard in the world, reaching a maximum length of 3.3 metres (11 ft) and weighing up to approximately 70 kilograms (150 lb).
                        The extinct varanid known as Megalania (Varanus priscus) may have been capable of reaching lengths more than 7 metres (23 ft).
                        However, as with extant species, these lengths are not verified.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
            </CardActions>
        </Card>
    );

}
export default MultiActionAreaCard;
