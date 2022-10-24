import { useState } from "react";
import { createPortal } from "react-dom";

const Menu = ({ showMenu, setIsWhite, setDifficulty, setShowLocalBoard, setShowComputerBoard, onHide }: any) => {
  const [showStart, setShowStart] = useState(true);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [isWhiteLocal, setIsWhiteLocal] = useState(true);

  if (!showMenu) return null;

  return createPortal(
    // Changing this to a modal
    <>
      <div id="overlay" className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-50"></div>
      <div id="modal" className="fixed text-center top-32 sm:top-1/4 left-1/2 translate-x-[-50%] translate-y-[-10%]  p-5 z-10 bg-white rounded-lg w-4/5 sm:w-auto">
        {showStart &&
          <div id="start" className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-10">Welcome to Chess Online!</h1>
            <button className="p-3 mb-5 block rounded-md bg-green-600 text-white font-bold text-lg w-1/2" onClick={onHide}>Play Local</button>
            <button className="p-3 mb-5 block rounded-md bg-gray-600 text-white font-bold text-lg w-1/2">Play Online</button>
            <button className="p-3 mb-5 block rounded-md bg-green-600 text-white font-bold text-lg w-1/2" onClick={() => { setShowDifficulty(true); setShowStart(false) }}>Play vs AI</button>
          </div>
        }
        {showDifficulty &&
          <div id="difficulty" className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-10">Select Difficulty</h1>
            <button className="p-3 mb-5 block rounded-md bg-gray-600 text-white font-bold text-lg w-1/2">Easy</button>
            <button className="p-3 mb-5 block rounded-md bg-gray-600 text-white font-bold text-lg w-1/2">Medium</button>
            <button className="p-3 mb-5 block rounded-md bg-gray-600 text-white font-bold text-lg w-1/2">Hard</button>
            <button className="p-3 mb-7 block rounded-md bg-green-600 text-white font-bold text-lg w-1/2" onClick={() => { setDifficulty(100); onHide(); setShowComputerBoard(true); setShowLocalBoard(false); }}>Impossible</button>

            <h3 className="text-xl mb-2">Select Color</h3>

            <div className="flex">
              <div className="flex items-center mr-4">
                <input checked={isWhiteLocal} onChange={() => { setIsWhite(true); setIsWhiteLocal(true) }} type="radio" className="w-4 h-4" />
                <label className="ml-1 text-sm font-medium">White</label>
              </div>
              <div className="flex items-center">
                <input checked={!isWhiteLocal} onChange={() => { setIsWhite(false); setIsWhiteLocal(false) }} type="radio" className="w-4 h-4"></input>
                <label className="ml-1 text-sm font-medium">Black</label>
              </div>
            </div>

          </div>
        }
      </div>
    </>,
    document.getElementById("modal")!
  )
}

export default Menu;