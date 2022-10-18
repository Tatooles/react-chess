import { useState } from 'react'
import Board from './Board'
import Menu from './Menu';

function App() {
  const [showBoard, setShowBoard] = useState(false);

  return (
    <div className='h-screen bg-slate-600'>
      <Board showBoard={showBoard} />
      <Menu showBoard={showBoard} onHide={() => setShowBoard(true)} />
      {/* Want another modal type element that shows up on top of the board */}
    </div>
  )
}

export default App
