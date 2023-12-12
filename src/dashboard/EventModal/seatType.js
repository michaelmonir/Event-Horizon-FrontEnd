import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function seatType({seatTypes, setSeatTypes, numberOfSeatTypes, setNumberOfSeatTypes}) {

    return (
        <div className={"seat-type-container"}>
            <div className={"seat-type-header"}>
                <Button onClick={(e) => {
                    e.preventDefault();
                    setNumberOfSeatTypes(numberOfSeatTypes + 1);
                    setSeatTypes([...seatTypes, {
                        "name": "",
                        "price": "",
                        "capacity": "",
                        "description": ""
                    }])
                }}>add seat type
                </Button>
            </div>
            <div className={"seat-type-body"}>
                {
                    seatTypes.map((seatType) => {
                        return (
                            <div className={"seat-type"}>
                                <TextField id="outlined-basic"
                                           label="Seat Type Name"
                                           type ="text"
                                           variant="outlined" required={true}
                                           value={seatType.name}
                                           onChange={(event) => {
                                               seatType.name = event.target.value;
                                               setSeatTypes([...seatTypes])
                                           }}
                                           sx={{width: "25%"}}
                                />
                                <TextField id="outlined-basic"
                                           label="Seat Type Price"
                                           variant="outlined" required={true}
                                           type="number"
                                           value={seatType.price}
                                           onChange={(event) => {
                                               seatType.price = event.target.value;
                                               if(seatType.price < 0) {
                                                   seatType.price = 0;
                                               }
                                               setSeatTypes([...seatTypes])
                                           }}
                                           sx={{width: "25%"}}
                                />
                                <TextField id="outlined-basic" label="Seat Type Capacity"
                                           variant="outlined" required={true}
                                           type="number"
                                           value={seatType.capacity}
                                           onChange={(event) => {
                                               if(event.target.value < 0) {
                                                   event.target.value = 0;
                                               }
                                               seatType.capacity = event.target.value;
                                               setSeatTypes([...seatTypes])
                                           }}
                                           sx={{width: "25%"}}
                                />
                                <TextField id="outlined-basic" label="Seat Type Description"
                                           variant="outlined" required={true}
                                           value={seatType.description}
                                           onChange={(event) => {
                                               seatType.description = event.target.value;
                                               setSeatTypes([...seatTypes])
                                           }}
                                           sx={{width: "25%"}}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );

}