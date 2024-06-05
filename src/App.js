import React, { useState } from 'react';
import './App.css';
import Developers from './Developers.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const devs = ['Alex', 'Christian', 'Florian', 'Hung', 'Jochen', 'Michael', 'Simon', 'Sven']

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="App">
      <DatePicker dateFormat="yyyy-MM-dd" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
      <Developers devs={devs} date={selectedDate} />
    </div>
  );
}

export default App
