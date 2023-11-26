import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Country, State,City }  from 'country-state-city';




export default function ComboBox() {
    let countries = Country.getAllCountries();
    let states = State.getAllStates();
    let cities = City.getAllCities();
    let countryNames = countries.map((country) => country.name);
    let countryAndID = countries.map((country) => ({name: country.name, isoCode: country.isoCode}));

    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [city, setCity] = React.useState("");
    const [statesInCountry, setStatesInCountry] = React.useState([]);
    const [citiesInState, setCitiesInState] = React.useState([] );



    return (
        <div className="flex">
            <Autocomplete
                disablePortal
                value={country}
                id="combo-box-demo"
                options= {countryNames}
                sx={{width: 300}}
                style={{marginRight: "10px"}}
                renderInput={(params) => <TextField {...params} label="Country"/>}
                onChange={(event, value) => {
                    if(!value){
                        setCountry(null);
                        setState(null);
                        setCity(null);
                        setStatesInCountry([]);
                        setCitiesInState([]);
                        return;
                    }
                    setCountry(value);
                    let countryID = countryAndID.find((country) => country.name === value).isoCode;
                    let statesInCountry = State.getStatesOfCountry(countryID);
                    let stateNames = statesInCountry.map((state) => state.name);
                    setStatesInCountry(stateNames);
                }}
            />
            <Autocomplete
                disablePortal
                value={state}
                id="combo-box-demo"
                options={statesInCountry}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} label="State"/>}
                onChange={(event, value) => {
                    if(!value){
                        setState(null);
                        setCity(null);
                        setCitiesInState([]);
                        return;
                    }
                    setState(value);
                    let stateID = states.find((state) => state.name === value).id;
                    let citiesInState = City.getCitiesOfState(stateID);
                    let cityNames = citiesInState.map((city) => city.name);
                    setCitiesInState(cityNames);
                }}

            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={city}
                options={citiesInState}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} label="City"/>}
                onChange={(event, value) => {
                    if(!value){
                        setCity(null);
                        return;
                    }
                    setCity(value);
                }}
            />
        </div>


    );
}
