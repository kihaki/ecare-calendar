import React, { useState } from 'react';
import './App.css';
import Developers from './Developers.js';
import DatePicker from "react-datepicker";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "react-datepicker/dist/react-datepicker.css";

const devs = ['Alex', 'Christian', 'Florian', 'Hung', 'Jochen', 'Michael', 'Simon', 'Sven']

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="App">
      <IconButton aria-label="back" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>
        <ArrowBackIcon />
      </IconButton>
      <DatePicker dateFormat="yyyy-MM-dd" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
      <IconButton aria-label="forward" onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>
        <ArrowForwardIcon />
      </IconButton>
      <Developers devs={devs} date={selectedDate} />
    </div>
  );
}

export default App
