import { Chess } from 'chess.js'
import { useState } from 'react'
import Square from './Square';

const Board = () => {
  const [board, setBoard] = useState(new Chess());
  const [clickedPiece, setClickedPiece] = useState({ i: -1, square: '' });

  const makeMove = (from: string, to: string) => {
    console.log(`Making move ${from} to ${to}`);
    const newBoard = new Chess(board.fen());
    const move = newBoard.move({ from: from, to: to });
    if (!move) {
      console.log('invalid move');
    }
    // TODO: Now need some validation to check for finished game or stalemate
    setBoard(newBoard);
  }

  const indexToSquare = (i: number): string => {
    return `${String.fromCharCode(i % 8 + 97)}${8 - Math.floor(i / 8)}`;
  }

  const squareClicked = (i: number, piece?: any) => {
    // This means we have already selected a piece, so try to make a move
    if (clickedPiece.i != -1) {
      makeMove(clickedPiece.square, indexToSquare(i));
      // Now deslect piece
      setClickedPiece({ i: -1, square: '' });
    }
    // TODO: Don't want to select a pice on take
    if (piece) {
      setClickedPiece({ i: i, square: piece.square });
      // TODO: Also select possible moves for this piece
    }
  }

  return (
    <div>
      <div id="board" className="grid grid-cols-8 bg-black w-[352px] h-[352px] md:w-[504px] md:h-[504px] mx-auto">
        {board.board().flat().map((piece, i) => (
          // Piece onClick will call a function with further logic to determine if it's the firist piece clicked
          // Maybe store the clicked piece in state
          // Later on that first click will highlight the possible moves for that piece
          <Square squareClicked={squareClicked} active={i == clickedPiece.i ? true : false} key={i} i={i} piece={piece}></Square>
        ))}
      </div>
    </div>
  )
}

export default Board