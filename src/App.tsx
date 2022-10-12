import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Board from './Board'
import Menu from './Menu';

function App() {
  const [showBoard, setShowBoard] = useState(false);

  return (
    <div className='mx-auto flex-col container h-screen bg-slate-600 pt-20'>
      <Board showBoard={showBoard} />
      <Menu showBoard={showBoard} hideMenu={() => setShowBoard(true)} />
      {/* Want another modal type element that shows up on top of the board */}
    </div>
  )
}

export default App
