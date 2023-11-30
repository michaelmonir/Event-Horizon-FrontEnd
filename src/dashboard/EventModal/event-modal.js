import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {Country, State} from "country-state-city";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {InputLabel} from "@mui/material";
import EventApis from "../../Apis/EventApis/EventApis";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// import moment

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
    const adsPlansOptions = ["Free Plan", "Regular Plan", "Premium Plan"]
    const planIndexMap = new Map(adsPlansOptions.map((plan, index) => [plan, index]));

    const handleClose = () => setOpen(false);
    const [eventCategory, setEventCategory] = React.useState("");
    let countries = Country.getAllCountries();
    let countryNames = countries.map((country) => country.name);
    let countryAndID = countries.map((country) => ({name: country.name, isoCode: country.isoCode}));
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [eventSubCategory, setEventSubCategory] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [statesInCountry, setStatesInCountry] = React.useState([]);
    const [adsPlan, setAdsPlan] = React.useState("");
    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 16));


    const handleEventCreation = async(e) => {
        e.preventDefault();
        const event = {
            "name": name,
            "description": description,
            "eventCategory": eventCategory + "-" + eventSubCategory,
            "eventDate": date,
            "eventAds": {
                            "id": planIndexMap.get(adsPlan)+1,
                            "name":adsPlan
                        },
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
    const LOCAL_STORAGE_KEY_Role = "role";

    const isTheUserOrganizer = () => {
        return (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_Role)) === "ROLE_ORGANIZER");
    }

    return (
        <div>
            { isTheUserOrganizer() ? (
                    <Button onClick={handleOpen}
                            style={
                                {
                                    position: "absolute",
                                    bottom: "40px",
                                    right: "40px",
                                }
                            }
                    >create event</Button>
                ) : null
            }
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
                            <div className="flex location">
                                <Autocomplete
                                    required={true}
                                    disablePortal
                                    value={country}
                                    id="combo-box-demo"
                                    options={countryNames}
                                    sx={{width: 289}}
                                    renderInput={(params) => <TextField required={true}{...params} label="Country"/>}
                                    onChange={(event, value) => {
                                        if (!value) {
                                            setCountry(null);
                                            setState(null);
                                            setAddress("");
                                            setStatesInCountry([]);
                                            return;
                                        }
                                        setCountry(value);
                                        let countryID = countryAndID.find((country) => country.name === value).isoCode;
                                        let statesInCountry = State.getStatesOfCountry(countryID);
                                        let stateNames = statesInCountry.map((state) => state.name);
                                        setStatesInCountry(stateNames);
                                    }}
                                />
                                <Autocomplete
                                    disablePortal
                                    required={true}
                                    value={state}
                                    id="combo-box-demo"
                                    options={statesInCountry}
                                    sx={{width: 300}}
                                    renderInput={(params) => <TextField {...params} required={true}label="State"/>}
                                    onChange={(event, value) => {
                                        if (!value) {
                                            setState(null);
                                            setAddress("");
                                            return;
                                        }
                                        setState(value)
                                    }}
                                />
                                <TextField
                                    required={true}
                                    type={"text"}
                                    label={"Address"}
                                    value={address}
                                    placeholder="Enter the Address"

                                    onChange={(event) => {
                                        if (!event.target.value) {
                                            setAddress("");
                                            return
                                        }
                                        setAddress(event.target.value);
                                        // console.log(event.target.value)
                                        // console.log(address)
                                    }}

                                />
                            </div>
                            <Autocomplete
                                disablePortal
                                required={true}
                                id="combo-box-demo"
                                options={[...eventCategoriesMap.keys()]}
                                sx={{width: 600}}
                                renderInput={(params) => <TextField {...params}required={true} label="Event category"/>}
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
                                required={true}
                                id="combo-box-demo"
                                options={eventCategory ? eventCategoriesMap.get(eventCategory) : []}
                                sx={{width: 600}}
                                value={eventSubCategory}
                                renderInput={(params) => <TextField {...params}required={true} label="Event sub-category"/>}
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
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value)
                                }}
                            />
                            <FormControl sx={{minWidth: 600}}>
                                <InputLabel id="demo-simple-select-helper-label">The Ads plan</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="ads Plans"
                                    required={true}
                                    value={adsPlan}
                                    onChange={(event) => {
                                            setAdsPlan(event.target.value);
                                        }
                                    }
                                >
                                {adsPlansOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                                </Select>
                                <FormHelperText>
                                    Choose your Suitable Ads plan
                                </FormHelperText>
                            </FormControl>
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