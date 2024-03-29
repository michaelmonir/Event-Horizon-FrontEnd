// Date: 2021-08-29

import {useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';


export default function LabTabs({setTabIndex}) {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setTabIndex(newValue)
    };

    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider', width: '100%'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab sx={{width: '50%',maxWidth:"100%"}} label="Launched Events" value="1"/>
                        <Tab sx={{width: '50%',maxWidth:"100%"}} label="Drafted Events" value="2"/>
                        {/*<Tab sx={{width: '33.3%'}} label="Past Events" value="3"/>*/}
                    </TabList>
                </Box>
            </TabContext>
        </Box>
    );
}