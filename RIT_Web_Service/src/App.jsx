import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Components/Nav';
import About from './Components/About';
import Degree from './Components/Degrees';
import Faculty from './Components/Faculty';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav/>
      <About/>
      <Degree/>
      <Faculty/>
    </>
  )
}

export default App
