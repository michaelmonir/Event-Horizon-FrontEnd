import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {City, Country, State} from "country-state-city";

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
    let countries = Country.getAllCountries();
    let states = State.getAllStates();
    let cities = City.getAllCities();
    let countryNames = countries.map((country) => country.name);
    let countryAndID = countries.map((country) => ({name: country.name, isoCode: country.isoCode}));

    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [city, setCity] = React.useState("");
    const [statesInCountry, setStatesInCountry] = React.useState([]);
    const [citiesInState, setCitiesInState] = React.useState([] );


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
                            <div className="flex location">
                                <Autocomplete
                                    disablePortal
                                    value={country}
                                    id="combo-box-demo"
                                    options= {countryNames}
                                    sx={{width: 289}}
                                    renderInput={(params) => <TextField {...params} label="Country"/>}
                                    onChange={(event, value) => {
                                        if(!value){
                                            setCountry(null);
                                            setState(null);
                                            setCity(null);
                                            setStatesInCountry([]);
                                            setCitiesInState([]);
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
                                    value={state}
                                    id="combo-box-demo"
                                    options={statesInCountry}
                                    sx={{width: 300}}
                                    renderInput={(params) => <TextField {...params} label="State"/>}
                                    onChange={(event, value) => {
                                        if(!value){
                                            setState(null);
                                            setCity(null);
                                            setCitiesInState([]);
                                            return;
                                        }
                                        setState(value);
                                        let stateID = states.find((state) => state.name === value).id;
                                        let citiesInState = City.getCitiesOfState(stateID);
                                        let cityNames = citiesInState.map((city) => city.name);
                                        setCitiesInState(cityNames);
                                    }}

                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    value={city}
                                    options={citiesInState}
                                    sx={{width: 300}}
                                    renderInput={(params) => <TextField {...params} label="City"/>}
                                    onChange={(event, value) => {
                                        if(!value){
                                            setCity(null);
                                            return;
                                        }
                                        setCity(value);
                                    }}
                                />
                            </div>
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
                                label="Event Date"
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