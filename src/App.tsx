import { useState } from 'react'
import Board from './Board'
import Menu from './Menu';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [difficulty, setDifficulty] = useState(-1);
  const [isWhite, setIsWhite] = useState(true);

  return (
    <div className='h-screen bg-slate-600'>
      <Board difficulty={difficulty} isWhite={isWhite} />
      <Menu showMenu={showMenu} setIsWhite={setIsWhite} setDifficulty={setDifficulty} onHide={() => setShowMenu(false)} />
    </div>
  )
}

export default App
