import { Chess } from 'chess.js'
import { forwardRef, useState } from 'react'
import Square from './Square';

const Board = () => {
  const [board, setBoard] = useState(new Chess());
  const [clickedPiece, setClickedPiece] = useState({ i: -1, square: '' });
  const [activeSquares, setActiveSquares] = useState([-1]);
  const [whiteMove, setWhiteMove] = useState(true);
  const [winner, setWinner] = useState('');

  const makeMove = (from: string, to: string) => {
    console.log(`Making move ${from} to ${to}`);
    const newBoard = new Chess(board.fen());
    const move = newBoard.move({ from: from, to: to });
    if (!move) {
      console.log('invalid move');
    } else {
      // Successful move
      // Now deslect piece and change current turn
      setActiveSquares([-1]);
      setClickedPiece({ i: -1, square: '' });
      setWhiteMove(!whiteMove);
    }

    setBoard(newBoard);

    // TODO: Now need some validation to check for finished game or stalemate
    if (newBoard.isGameOver()) {
      console.log("game is over");
      // Check which specific scenario it is
      if (newBoard.isCheckmate()) {
        whiteMove ? setWinner('white') : setWinner('black');
      }
      else if (newBoard.isStalemate()) {
        console.log('You have a stalemate');
      }
    }
  }

  /**
   * Convert from array index to chess terminology
   * @param i - Index in the array
   * @returns Chess terminology
   */
  const indexToSquare = (i: number): string => {
    return `${String.fromCharCode(i % 8 + 97)}${8 - Math.floor(i / 8)}`;
  }

  const squareToIndex = (square: any): number => {
    // If not a pawn, moves have the piece character at the beginning
    if (square.length > 2) {
      square = square.substring(1);
    }
    const x = square.charCodeAt(0) - 97;
    const y = 8 - parseInt(square.charAt(1));

    return y * 8 + x;
  }

  /**
   * Determine whether it's this piece's turn
   * @param piece 
   * @returns true if it is this piece's turn, else false
   */
  const pieceIsCurrentTurn = (piece: any): boolean => {
    if (piece.color == 'w' && whiteMove || piece.color == 'b' && !whiteMove) {
      return true;
    }
    return false;
  }

  const squareClicked = (i: number, piece?: any) => {
    // Select the current piece, and highlight it and all other possible moves
    if (piece && pieceIsCurrentTurn(piece)) {
      setClickedPiece({ i: i, square: piece.square });
      const moves = board.moves({ square: piece.square });
      let selected = [];
      selected.push(i);
      moves.forEach(move => {
        selected.push(squareToIndex(move));
      });
      setActiveSquares(selected);
    }
    // This means we have already selected a piece, so try to make a move
    if (clickedPiece.i != -1) {
      makeMove(clickedPiece.square, indexToSquare(i));
    }
  }

  const clearBoard = () => {
    setBoard(new Chess());
    setWhiteMove(true);
    setWinner('');
  }

  return (
    <>
      <div id="board" className="grid grid-cols-8 bg-black w-[352px] h-[352px] md:w-[504px] md:h-[504px] mx-auto">
        {board.board().flat().map((piece, i) => (
          // Piece onClick will call a function with further logic to determine if it's the firist piece clicked
          // Maybe store the clicked piece in state
          // Later on that first click will highlight the possible moves for that piece
          <Square squareClicked={squareClicked} active={activeSquares.includes(i) ? true : false} key={i} i={i} piece={piece}></Square>
        ))}
      </div>
      {winner && <div className='mx-auto'>Game over {winner} has won</div>}
      <button className='align-middle items-center text-center justify-center mx-auto' onClick={clearBoard}>Clear Board</button>
    </>
  )
}

export default Board