import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import './App.css'

function App() {

  return (
    <div className="App">
      <Canvas camera={{near: 0.0001}} className='canvas'>
        <Experience/>
      </Canvas>
    </div>
  )
}

export default App
