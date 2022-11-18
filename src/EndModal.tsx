import { createPortal } from "react-dom";

const Modal = ({ result, open, onClose }: any) => {
  if (!open) return null;

  return createPortal(
    <>
      <div id="overlay" className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-50"></div>
      <div id="modal" className="fixed text-center top-1/3 left-1/2 translate-x-[-50%] translate-y-[-10%] p-5 z-10 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Game Over</h1>
        {result !== 'stalemate' ? <p>{result} has won the game!</p> : <p>Stalemate</p>}
        <button onClick={onClose} className="bg-gray-500 p-4 rounded-md text-white font-bold mt-4">Close</button>
      </div>
    </>,
    document.getElementById("modal")!
  )
}

export default Modal;