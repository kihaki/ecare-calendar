import React from 'react'
import './App.css'
import './Date.js'
import Developers from './Developers.js'

const devs = ['Alex', 'Christian', 'Dinesh', 'Hung', 'Jochen', /*'Michael'*/, 'Simon', 'Sven']

function App() {
  return (
    <div className="App">
      <Developers devs={devs} date={new Date()} />
    </div>
  );
}

export default App
