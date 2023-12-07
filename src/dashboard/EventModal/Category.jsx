import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

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


export const Category
    = ({eventCategory, eventSubCategory,
           setEventCategory,setEventSubCategory}) => {

    return (
        <div>
            <Autocomplete
                disablePortal
                required={true}
                id="combo-box-demo"
                options={[...eventCategoriesMap.keys()]}
                sx={{width: 600}}
                renderInput={(params) => <TextField {...params}required={true} label="Event category"/>}
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
                required={true}
                id="combo-box-demo"
                options={eventCategory ? eventCategoriesMap.get(eventCategory) : []}
                sx={{width: 600}}
                value={eventSubCategory}
                renderInput={(params) => <TextField {...params}required={true} label="Event sub-category"/>}
                onChange={(event, value) => {
                    if (!value) {
                        setEventSubCategory(null);
                        return;
                    }
                    setEventSubCategory(value);
                }}
            />
        </div>
    )
}