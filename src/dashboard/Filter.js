import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ImEqualizer} from "react-icons/im";
import {CountryCityStreet} from "../EventModal/CountryCityStreet";
import {Category} from "../EventModal/Category";
import TextField from "@mui/material/TextField";

export default function Filter({ getDtoListFromBackEnd })
   {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [name, setName] = React.useState("");
    const [eventCategory, setEventCategory] = React.useState("");
    const [eventSubCategory, setEventSubCategory] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [statesInCountry, setStatesInCountry] = React.useState([]);
    const [organizerName, setOrganizerName] = React.useState("");

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

    const handleFilter = async(e) => {
        e.preventDefault();
        const filterDto = {
            filters: [
                {
                    "first": "NAME",
                    "second": "AND",
                    "third": name
                },
                {
                    "first": "ADDRESS",
                    "second": "AND",
                    "third": address
                },
                {
                    "first": "COUNTRY",
                    "second": "AND",
                    "third": country
                },
                {
                    "first": "CITY",
                    "second": "AND",
                    "third": state
                },
                {
                    "first": "CATEGORY",
                    "second": "AND",
                    "third": eventCategory + "-" + eventSubCategory
                },
                {
                    "first": "ORGANIZER",
                    "second": "AND",
                    "third": organizerName
                }
            ]
        }

        await getDtoListFromBackEnd(filterDto);
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
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Typography sx={{p: 2, height: 500}}>
                    <form className="filter-tab" onSubmit={handleFilter}>
                        <div className="filter-tab-header">
                            <h3>Filter</h3>
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