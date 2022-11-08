import { useState } from 'react'
import LocalBoard from './LocalBoard'
import ComputerBoard from './ComputerBoard';
import Menu from './Menu';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [difficulty, setDifficulty] = useState(-1);
  const [isWhite, setIsWhite] = useState(true);
  const [showLocalBoard, setShowLocalBoard] = useState(true);
  const [showComputerBoard, setShowComputerBoard] = useState(false);

  return (
    <div className='h-screen bg-slate-600'>
      <LocalBoard showLocalBoard={showLocalBoard} />
      <ComputerBoard showComputerBoard={showComputerBoard} difficulty={difficulty} isWhite={isWhite} />
      <Menu showMenu={showMenu} setIsWhite={setIsWhite} setDifficulty={setDifficulty} setShowLocalBoard={setShowLocalBoard} setShowComputerBoard={setShowComputerBoard} onHide={() => setShowMenu(false)} />
    </div>
  )
}

export default App
