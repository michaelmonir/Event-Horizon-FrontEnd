import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FaPen} from "react-icons/fa6";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";

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

export default function BasicModal({firstName, lastName, gender, email, paypalAccount}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

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
                        <form className="profile-update-modal-form" action="#">
                            <TextField variant={"outlined"} label={"First Name"} defaultValue={firstName}/>
                            <TextField variant={"outlined"} label={"Last Name"} defaultValue={lastName}/>
                            <TextField variant={"outlined"} label={"email"} defaultValue={email}/>
                            <TextField variant={"outlined"} label={"Paypal Account"} defaultValue={paypalAccount}/>
                            <FormControl sx={{maxWidth:200}}>
                                <InputLabel id="demo-simple-select-helper-label">gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    label="gender"
                                    value={gender}
                                    onChange={(event) => {
                                        gender = event.target.value
                                        console.log(gender)
                                    }
                                    }
                                >
                                    <MenuItem value={gender}>{gender}</MenuItem>
                                    <MenuItem
                                        value={gender === "Male" ? "Female" : "Male"}>{gender === "Male" ? "Female" : "Male"} </MenuItem>
                                </Select>
                                <FormHelperText>
                                      select Gender of your choice
                                </FormHelperText>
                            </FormControl>
                            <Button type="submit" value="Submit" variant="contained" style={{
                              width:"150px"
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