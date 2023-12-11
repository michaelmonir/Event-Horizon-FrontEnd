import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ImEqualizer} from "react-icons/im";
import {CountryCityStreet} from "./EventModal/CountryCityStreet";
import {Category} from "./EventModal/Category";
import TextField from "@mui/material/TextField";

export default function BasicPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [name, setName] = React.useState("");
    const [eventCategory, setEventCategory] = React.useState("");
    const [eventSubCategory, setEventSubCategory] = React.useState("");
    const [Country, setCountry] = React.useState("");
    const [State, setState] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [statesInCountry, setStatesInCountry] = React.useState([]);
    const [OrganizerName, setOrganizerName] = React.useState("");
    return (
        <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
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
                <Typography sx={{p: 2 ,height: 500}}>
                    <div className="filter-tab">
                        <div className="filter-tab-header">
                            <h3>Filter</h3>
                        </div>
                        <div className="filter-tab-body">
                            <TextField id="outlined-basic" label="Event Name" variant="outlined"
                                       helperText="please enter the Event Name"
                                       value={name}
                                       onChange={(event) => {
                                           setName(event.target.value);
                                       }}
                            />
                            <CountryCityStreet country={Country} state={State}
                                               address={address} statesInCountry={statesInCountry}
                                               setCountry={setCountry} setState={setState}
                                               setAddress={setAddress} setStatesInCountry={setStatesInCountry}
                                               req={false}
                            />

                            <Category eventCategory={eventCategory} eventSubCategory={eventSubCategory}
                                      setEventCategory={setEventCategory} setEventSubCategory={setEventSubCategory}
                                      req={false}/>

                            <TextField id="outlined-basic" label="Organizer Name" variant="outlined"
                                       helperText="please enter the Organizer Name"
                                       value={OrganizerName}
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
                    </div>
                </Typography>
            </Popover>
        </div>
    );
}