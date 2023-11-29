import * as React from 'react';

import informationApis from "../Apis/UserApis/InformationApis";
import {FaPen} from "react-icons/fa6";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Box,
    Button,
    Typography,
    Modal
} from "@mui/material";


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
    width: "50%",
};


export default function BasicModal({defaultFirstName, defaultLastName, defaultGender, defaultPaypalAccount}) {

    const [firstName, setFirstName] = React.useState(defaultFirstName);
    const [lastName, setLastName] = React.useState(defaultLastName);
    const [gender, setGender] = React.useState(defaultGender);
    const [paypalAccount, setPaypalAccount] = React.useState(defaultPaypalAccount);


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const LOCAL_STORAGE_KEY_ID = "id";
    const handleInformationChange = async (event) => {
        // event.preventDefault(); //////  to  handle page refresh
        const newInformation = {
            "id":JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ID)),
            "firstName": firstName,
            "lastName": lastName,
            "gender": gender,
            "payPalAccount": paypalAccount,
        }
        try {
            const response = await informationApis.put("updateInformation", newInformation);
        } catch (error) {
            alert("not Found")
        }
    }


    return (
        <div>
            <Button onClick={handleOpen}><FaPen/></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Profile Info
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 1}}>
                        <form className="profile-update-modal-form" onSubmit={handleInformationChange}>
                            <TextField variant={"outlined"} label={"First Name"} defaultValue={defaultFirstName}

                                       value={firstName}
                                       onChange={(event) => {
                                           setFirstName(event.target.value)
                                       }}

                            />
                            <TextField variant={"outlined"} label={"Last Name"} defaultValue={defaultLastName}

                                       value={lastName}
                                       onChange={(event) => {
                                           setLastName(event.target.value)
                                       }}

                            />
                            <TextField variant={"outlined"} label={"Paypal Account"} defaultValue={defaultPaypalAccount}

                                       value={paypalAccount}
                                       onChange={(event) => {
                                           setPaypalAccount(event.target.value)
                                       }}


                            />
                            <FormControl sx={{maxWidth: 200}}>
                                <InputLabel id="demo-simple-select-helper-label">gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="gender"
                                    value={gender}
                                    onChange={(event) => {
                                        setGender(event.target.value)
                                        defaultGender = event.target.value
                                        console.log(gender)
                                    }
                                    }
                                >
                                    <MenuItem value={defaultGender}>{defaultGender}</MenuItem>
                                    <MenuItem
                                        value={defaultGender === "MALE" ? "FEMALE" : "MALE"}>{defaultGender === "MALE" ? "FEMALE" : "MALE"} </MenuItem>
                                </Select>
                                <FormHelperText>
                                    select Gender of your choice
                                </FormHelperText>
                            </FormControl>
                            <Button type="submit" value="Submit" variant="contained" style={{
                                width: "150px", color: "##150044",
                            }}>
                                Submit
                            </Button>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}