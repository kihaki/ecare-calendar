import React from 'react'
import './App.css'
import Developers from './Developers.js'

const devs = ['Alex', 'Christian', /* 'Dinesh' */, 'Hung', /*'Jochen', 'Michael',*/ 'Simon', 'Sven']
const inactiveDevs = ['Dinesh', 'Jochen']

function App() {
  return (
    <div className="App">
      <Developers devs={devs} date={new Date()} />
    </div>
  );
}

export default App
