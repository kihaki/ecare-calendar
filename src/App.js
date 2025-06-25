import React, { useState } from 'react';
import './App.css';
import Developers from './Developers.js';
import DatePicker from "react-datepicker";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@mui/material';

const devs = ['Florian', 'Michael', 'Oliver', 'Simon', 'Sven']

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="App">
      <div align="center">
        <IconButton aria-label="back" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>
          <ArrowBackIcon />
        </IconButton>
        <DatePicker dateFormat="yyyy-MM-dd" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
        <Button onClick={() => setSelectedDate(new Date())}>Heute</Button>
        <IconButton aria-label="forward" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>
          <ArrowForwardIcon />
        </IconButton>
        <DateComponent date={selectedDate} />
      </div>
      <Developers devs={devs} date={selectedDate} />
    </div>
  );
}

// Utility function to format the date
function formatDateToGerman(date) {
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long', // Day of the week
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

const DateComponent = ({ date }) => {
  return (<p>{formatDateToGerman(date)}</p>);
};

export default App
