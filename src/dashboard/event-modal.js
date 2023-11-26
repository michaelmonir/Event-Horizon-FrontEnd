import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Location from "./location";
import Autocomplete from "@mui/material/Autocomplete";

let eventCategoriesMap = new Map([
    ["Social Events", ["Weddings", "Parties", "Reunions", "Celebrations"]],
    ["Corporate Events", ["Conferences", "Seminars", "Trade Shows/Exhibitions", "Product Launches"]],
    ["Cultural Events", ["Festivals", "Concerts", "Art Exhibitions", "Cultural Performances"]],
    ["Educational Events", ["Workshops", "Lectures", "Training Programs"]],
    ["Sports Events", ["Tournaments", "Matches/Games", "Marathons"]],
    ["Charity and Fundraising Events", ["Galas", "Auctions", "Walks/Runs"]],
    ["Political Events", ["Rallies", "Debates", "Election Days"]],
    ["Religious Events", ["Services", "Festivals", "Pilgrimages"]],
    ["Experiential Events", ["Escape Rooms", "Immersive Theater", "Virtual Reality Experiences"]],
    ["Community Events", ["Parades", "Clean-up Campaigns", "Civic Meetings"]]
]);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [eventCategory, setEventCategory] = React.useState("");
    const [eventSubCategory, setEventSubCategory] = React.useState("");

    return (
        <div>
            <Button onClick={handleOpen} style={
                {
                    position: "absolute",
                    bottom: "40px",
                    right: "40px",
                }

            }>create event</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        create an event
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <form className="modal-form" action="#">
                            <TextField id="outlined-basic" label="Event Name" variant="outlined" required={true}
                                       helperText="please enter the Event Name"/>
                            <Location/>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={[...eventCategoriesMap.keys()]}
                                sx={{width: 600}}
                                renderInput={(params) => <TextField {...params} label="Event category"/>}
                                onChange={(event, value) => {
                                    if (!value) {
                                        setEventCategory(null);
                                        setEventSubCategory(null);
                                        return;
                                    }
                                    setEventCategory(value);
                                }}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={eventCategory ? eventCategoriesMap.get(eventCategory) : []}
                                sx={{width: 600}}
                                renderInput={(params) => <TextField {...params} label="Event sub-category"/>}
                                onChange={(event, value) => {
                                    if (!value) {
                                        setEventSubCategory(null);
                                        return;
                                    }
                                    setEventSubCategory(value);
                                }}
                            />
                            <TextField
                                id="fullWidth"
                                type={"number"}
                                label="Description"
                                placeholder="description"
                                multiline
                                required={true}
                                sx={{width: 600}}
                                helperText="please enter the Event Description"
                            />
                            <TextField
                                id="datetime-local"
                                label="Next appointment"
                                defaultValue={new Date().toISOString().slice(0, 16)}
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required={true}
                                helperText="please enter the Event Date"
                            />
                            <Button type="submit" value="Submit" variant="contained">
                                Submit
                            </Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}