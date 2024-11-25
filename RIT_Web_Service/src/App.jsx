import { useState } from 'react'
import './App.css'
import Nav from './Components/Nav';
import About from './Components/About';
import Degree from './Components/Degrees';
import Faculty from './Components/Faculty';
import Footer from './Components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav/>
      <About/>
      <Degree/>
      <Faculty/>
      <Footer/>
    </>
  )
}

export default App
