import TextField from "@mui/material/TextField";
import * as React from "react";

export const DateTime = ({date, setDate}) => {

    return (
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
    )
}