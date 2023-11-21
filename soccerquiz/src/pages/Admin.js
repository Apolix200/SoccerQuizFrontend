import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserList from '../components/UserList';
import Import from '../components/Import';
import QuizList from '../components/QuizList';

export default function Admin() {

    const [value, setValue] = React.useState('1');
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable">
              <Tab label="Kvízek" value="1" />
              <Tab label="Importál" value="2" />
              <Tab label="Felhasznalok" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <QuizList />
          </TabPanel>
          <TabPanel value="2">
            <Import />
          </TabPanel>
          <TabPanel value="3">
            <UserList />
          </TabPanel>
        </TabContext>

      );
  }
  