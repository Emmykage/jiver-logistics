import { useState } from 'react'
import './App.css'
import JiverTransportServices from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <JiverTransportServices />
    </>
  )
}

export default App
