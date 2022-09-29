import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Board from './Board'

function App() {
  return (
    <div className='mx-auto flex container h-screen justify-center align-middle text-center bg-slate-600'>
      <Board />
    </div>
  )
}

export default App
