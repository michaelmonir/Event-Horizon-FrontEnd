import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ImEqualizer} from "react-icons/im";
import {CountryCityStreet} from "./EventModal/CountryCityStreet";
import {Category} from "./EventModal/Category";
import TextField from "@mui/material/TextField";

export default function BasicPopover({name, setName,
                                         eventCategory, setEventCategory,
                                         eventSubCategory, setEventSubCategory,
                                         country, setCountry,
                                         state, setState,
                                         address, setAddress,
                                         statesInCountry, setStatesInCountry,
                                         organizerName, setOrganizerName,
                                            modifyPages
                                     })
   {
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAddress("");
        setCountry("");
        setState("");
        setStatesInCountry([]);
        setEventCategory("");
        setEventSubCategory("");
        setName("");
        setOrganizerName("");
    };

    const handleFilter = (e) => {
        e.preventDefault();
        console.log(name, eventCategory, eventSubCategory, country, state, address, organizerName);
        modifyPages();
        handleClose();
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
            >
                <ImEqualizer/>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{p: 2, height: 500}}>
                    <form className="filter-tab" onSubmit={handleFilter}>
                        <div className="filter-tab-header">
                            <h3>Event Filter</h3>
                        </div>
                        <div className="filter-tab-body">
                            <TextField
                                id="outlined-basic"
                                label="Event Name"
                                variant="outlined"
                                helperText="please enter the Event Name"
                                value={name}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    setName(event.target.value);
                                    console.log(name);
                                }}
                            />
                            <CountryCityStreet
                                country={country}
                                state={state}
                                address={address}
                                statesInCountry={statesInCountry}
                                setCountry={setCountry}
                                setState={setState}
                                setAddress={setAddress}
                                setStatesInCountry={setStatesInCountry}
                                req={false}
                            />
                            <Category
                                eventCategory={eventCategory}
                                eventSubCategory={eventSubCategory}
                                setEventCategory={setEventCategory}
                                setEventSubCategory={setEventSubCategory}
                                req={false}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Organizer Name"
                                variant="outlined"
                                helperText="please enter the Organizer Name"
                                value={organizerName}
                                onChange={(event) => {
                                    setOrganizerName(event.target.value);
                                }}
                            />
                            <div className="filter-tab-footer">
                                <Button type="submit" value="Submit" variant="contained">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </form>
                </Typography>
            </Popover>
        </div>
    );
}