import {InputLabel} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import * as React from "react";

export const AdsPlan = ({setAdsPlan}) => {

    const adsPlansOptions = ["Free Plan", "Regular Plan", "Premium Plan"]
    const planIndexMap = new Map(adsPlansOptions.map((plan, index) => [plan, index]));
    const [viewedAdsPlan, setViewedAdsPlan] = React.useState("");


    return (
        <FormControl sx={{minWidth: 600}}>
            <InputLabel id="demo-simple-select-helper-label">The Ads plan</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="ads Plans"
                required={true}
                value={viewedAdsPlan}

                onChange={(event) => {
                    setAdsPlan({
                        "id" : planIndexMap.get(event.target.value)+1,
                        "name" : event.target.value
                    })
                    setViewedAdsPlan(event.target.value);;
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
    )
}