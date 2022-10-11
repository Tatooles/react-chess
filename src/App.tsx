import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Board from './Board'
import Menu from './Menu';

function App() {
  const [showBoard, setShowBoard] = useState(false);

  const changeShowBoard = (show: boolean) => {
    setShowBoard(show);
  }

  return (
    <div className='mx-auto flex-col container h-screen bg-slate-600 pt-20'>
      <Board showBoard={showBoard} />
      <Menu showBoard={showBoard} changeShowBoard={changeShowBoard} />
      {/* Want another modal type element that shows up on top of the board */}
    </div>
  )
}

export default App
