import { useState } from 'react'
import Board from './Board'
import Menu from './Menu';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [difficulty, setDifficulty] = useState(-1);

  return (
    <div className='h-screen bg-slate-600'>
      <Board difficulty={difficulty} />
      <Menu showMenu={showMenu} setDifficulty={setDifficulty} onHide={() => setShowMenu(false)} />
      {/* Want another modal type element that shows up on top of the board */}
    </div>
  )
}

export default App
