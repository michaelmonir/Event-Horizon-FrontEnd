import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField"
import {useNavigate} from 'react-router-dom';
import {CountryCityStreet} from "./CountryCityStreet";
import {Category} from "./Category";
import {RoutePathNames} from "../../Routes/RoutePathNames";
import {AdsPlan} from "./AdsOptions";
import {Description} from "./Description";
import {DateTime} from "./DateTime"
import SeatType from "./seatType"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3.5,
    width: "70%",
    borderRadius: "24px",
};

export default function BasicModal({responseFunction, eventId,buttonName}) {
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
    const [eventCategory, setEventCategory] = React.useState("");
    const [eventSubCategory, setEventSubCategory] = React.useState("");
    const [adsPlan, setAdsPlan] = React.useState("");
    const [date, setDate] = React.useState(new Date().toISOString().slice(0, 16));
    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [statesInCountry, setStatesInCountry] = React.useState([]);
    const [description, setDescription] = React.useState("");
    const [seatTypes, setSeatTypes] = React.useState([]);
    const [numberOfSeatTypes, setNumberOfSeatTypes] = React.useState(0);

    const handleEventCreation = async (e) => {
        e.preventDefault();
        const event = {
            "id": eventId,
            "name": name,
            "description": description,
            "eventCategory": eventCategory + "-" + eventSubCategory,
            "eventDate": date,
            "eventAds": adsPlan,
            "eventLocation": {
                "country": country,
                "city": state,
                "address": address
            },
            "seatTypes":seatTypes
        }
        try {
            const response =
                await responseFunction(event)
            alert(JSON.stringify(response.data))
            const myId = response.data.id;
            const params = {
                id: myId,
            };
            handleClose()
            navigate(RoutePathNames.event, {state: params});

            navigate(0)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div >
            <Button onClick={handleOpen}
                    style={
                        {
                            position: "absolute",
                            bottom: "40px",
                            right: "40px",
                        }
                    }
                    variant={"contained"}
            >{buttonName}</Button>

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
                                setCountry={setCountry} setState={setState} setAddress={setAddress}
                                setStatesInCountry={setStatesInCountry}
                                req={true}
                            />
                            <Category
                                eventCategory={eventCategory} eventSubCategory={eventSubCategory}
                                setEventCategory={setEventCategory} setEventSubCategory={setEventSubCategory}
                                req={true}
                            />
                            <Description description={description} setDescription={setDescription}/>
                            <AdsPlan setAdsPlan={setAdsPlan} req={true}/>
                            <DateTime date={date} setDate={setDate} req={true}/>
                            <div className={"seat-type"}>
                                <SeatType seatTypes={seatTypes} setSeatTypes={setSeatTypes} numberOfSeatTypes={numberOfSeatTypes} setNumberOfSeatTypes={setNumberOfSeatTypes}/>
                            </div>
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