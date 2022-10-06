import { Chess } from 'chess.js'
import { useState } from 'react'
import Square from './Square';

const Board = () => {
  const [chess, setChess] = useState(new Chess());

  const makeMove = () => {
    const newBoard = new Chess(chess.fen());
    newBoard.move('e4');
    setChess(newBoard);
  }

  return (
    <div>
      <h2 className="text-8xl">test number 1</h2>
      Here is the board
      <button className='border-2' onClick={makeMove}>init chess</button>
      {/* fixed size for different screens here */}
      <div id="board" className="grid grid-cols-8 bg-black w-[350px] h-[350px] md:w-[500px] md:h-[500px] mx-auto">
        {chess.board().flat().map((piece, i) => (
          // Piece onClick will call a function with further logic to determine if it's the firist piece clicked
          // Maybe store the clicked piece in state
          // Later on that first click will highlight the possible moves for that piece
          <Square key={i} i={i} piece={piece}></Square>
        ))}
      </div>
    </div>
  )
}

export default Board