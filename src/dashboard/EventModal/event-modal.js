import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {InputLabel} from "@mui/material";
import EventApis from "../../Apis/EventApis/EventApis";
import { useNavigate } from 'react-router-dom';
import {CountryCityStreet} from "./CountryCityStreet";
import {Category} from "./Category";
import {AdsPlan} from "./AdsOptions";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "24px",
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleOpen = () => {
        setOpen(true);
        setEventSubCategory(null);
        setEventCategory(null);
        setCountry(null);
        setState(null);
        setStatesInCountry([]);
        setAdsPlan("");
    }

    const handleClose = () => setOpen(false);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [eventCategory, setEventCategory] = React.useState("");
    const [eventSubCategory, setEventSubCategory] = React.useState("");
    const [adsPlan, setAdsPlan] = React.useState("");
    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 16));
    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [statesInCountry, setStatesInCountry] = React.useState([]);


    const handleEventCreation = async(e) => {
        e.preventDefault();
        const event = {
            "name": name,
            "description": description,
            "eventCategory": eventCategory + "-" + eventSubCategory,
            "eventDate": date,
            "eventAds": adsPlan,
            "eventLocation": {
                "country": country,
                "city": state,
                "address": address
            }
        }
        const LOCAL_STORAGE_KEY_ID = "id";
        try {
            const response =
                await EventApis.post("createEvent/"+JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ID)), event)
            const myId=response.data.id;
            const params = {
                id: myId,
            };
            // Navigate to a new route and pass parameters
            navigate('/event', { state: params });
        }
        catch(error)
        {
            alert(error.response.data.message)
        }

    }

    return (
        <div>
            <Button onClick={handleOpen}
                    style={
                        {
                            position: "absolute",
                            bottom: "40px",
                            right: "40px",
                        }
                    }
            >create event</Button>

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
                    <Typography id="modal-modal-description" sx={{mt: 1}}>
                        <form className="modal-form" onSubmit={handleEventCreation}>
                            <TextField id="outlined-basic" label="Event Name" variant="outlined" required={true}
                                       helperText="please enter the Event Name"
                                       value={name}
                                       onChange={(event) => {
                                           setName(event.target.value);
                                       }}
                            />
                            <CountryCityStreet
                                country={country} state={state} address={address} statesInCountry={statesInCountry}
                                setCountry={setCountry} setState={setState} setAddress={setAddress} setStatesInCountry={setStatesInCountry}
                            />

                            <Category
                                eventCategory={eventCategory} eventSubCategory={eventSubCategory}
                                setEventCategory={setEventCategory} setEventSubCategory={setEventSubCategory}
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
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value)
                                }}
                            />

                            <AdsPlan setAdsPlan={setAdsPlan} />

                            <TextField
                                id="datetime-local"
                                label="Event Date"
                                value={date}

                                onChange={(event) => {
                                    setDate(event.target.value)
                                }}
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