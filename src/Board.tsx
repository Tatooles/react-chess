import { Chess } from 'chess.js'
import { useState } from 'react'

const Board = () => {
  const [chess, setChess] = useState(new Chess());

  const makeMove = () => {
    const newBoard = new Chess(chess.fen());
    newBoard.move('e4');
    setChess(newBoard);
  }

  return (
    <div className="container">
      <h2 className="text-8xl">test number 1</h2>
      Here is the board
      <button className='border-2' onClick={makeMove}>init chess</button>
      {chess.board().map((piece, i) => (
        <div key={i}>{JSON.stringify(piece)}</div>
      ))}
    </div>
  )
}

export default Board