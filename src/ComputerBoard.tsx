import axios, { AxiosError } from 'axios';
import { Chess } from 'chess.js'
import { useEffect, useState } from 'react'
import EndModal from './EndModal';
import ErrorModal from './ErrorModal';
import Square from './Square';
import { PulseLoader } from 'react-spinners';

const ComputerBoard = ({ showComputerBoard, difficulty, isWhite }: any) => {
  const [board, setBoard] = useState(new Chess());
  const [clickedPiece, setClickedPiece] = useState({ i: -1, square: '' });
  const [activeSquares, setActiveSquares] = useState([-1]);
  const [previousMove, setPreviousMove] = useState([-1]);
  const [whiteMove, setWhiteMove] = useState(true);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const [showEndModal, setShowEndModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // If the board is updated and it's the computer's turn they need to move
    // Use the fen to determine whose turn it is
    // If computer's turn, call computer move function
    const turn = board.fen().split(' ')[1];

    if (turn === 'w' && !isWhite || turn === 'b' && isWhite) {
      makeComputerMove();
    }
  }, [board]);

  useEffect(() => {
    // If difficulty has been set that means the game started, and if the computer is white they move first
    if (difficulty != -1 && !isWhite) {
      makeComputerMove();
    }
  }, [difficulty]);

  // Probably need another useEffect
  // If player is black computer makes first move

  const executeMove = (from: string, to: string) => {
    const newBoard = new Chess(board.fen());
    const move = newBoard.move({ from: from, to: to });
    if (!move) {
      return board;
    } else {
      // Successful move
      // Now deslect piece and change current turn
      setActiveSquares([-1]);
      setClickedPiece({ i: -1, square: '' });
      setWhiteMove(!whiteMove);

      // Also highlight previous move
      setPreviousMove([squareToIndex(from), squareToIndex(to)]);
    }

    setBoard(newBoard);

    if (newBoard.isGameOver()) {
      // Check which specific scenario it is
      if (newBoard.isCheckmate()) {
        whiteMove ? setResult('White') : setResult('Black');
      }
      else if (newBoard.isStalemate()) {
        setResult('Stalemate');
      }

      // Show game over modal
      setShowEndModal(true);
    }
    return newBoard;
  }

  const makeComputerMove = async () => {
    setLoading(true);
    try {
      let response = await axios.post('https://5r908wi8c7.execute-api.us-east-2.amazonaws.com', {
        position: board.fen()
      });

      let data = await response;
      let move = data.data.move;
      executeMove(move.slice(0, 2), move.slice(2, 4));
    } catch (error) {
      const err = error as AxiosError;
      setErrorMessage(err.message);
      setShowErrorModal(true);
    }
    setLoading(false);
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
    // If a taking move, remove the X
    square = square.replace('x', '');
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
    if (piece.color === 'w' && whiteMove || piece.color === 'b' && !whiteMove) {
      return true;
    }
    return false;
  }

  const squareClicked = (i: number, piece?: any) => {
    // Select the current piece, and highlight it and all other possible moves
    if (piece && pieceIsCurrentTurn(piece) && ((piece.color == 'w' && isWhite) || (piece.color == 'b' && !isWhite))) {
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
      executeMove(clickedPiece.square, indexToSquare(i));
    }
  }

  const clearBoard = () => {
    setBoard(new Chess());
    setWhiteMove(true);
    setResult('');
    setActiveSquares([-1]);
    setPreviousMove([-1]);
    setClickedPiece({ i: -1, square: '' });
    setLoading(false);
  }

  const closeModal = (clear: boolean) => {
    setShowEndModal(false);
    setShowErrorModal(false);
    if (clear) {
      clearBoard();
    }
  }

  if (!showComputerBoard) return null;

  return (
    <div className="flex-col fixed text-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" >
      <PulseLoader
        className='fixed left-1/2 translate-x-[-50%] top-[-50px]'
        color='gray'
        loading={loading}
      />
      <div id="board" className="grid grid-cols-8 bg-black w-[352px] h-[352px] md:w-[504px] md:h-[504px] mx-auto" >
        {
          board.board().flat().map((piece, i) => (
            <Square squareClicked={squareClicked} active={activeSquares.includes(i) ? true : false} previous={previousMove.includes(i) ? true : false} key={i} i={i} piece={piece} ></Square>
          ))
        }
      </div>
      <button className='mt-10 border-2 p-5 rounded-lg bg-white' onClick={clearBoard} >Reset Board</button>
      <EndModal result={result} open={showEndModal} onClose={() => closeModal(true)} />
      <ErrorModal message={errorMessage} open={showErrorModal} onClose={() => closeModal(true)} retry={() => { makeComputerMove(); closeModal(false) }} />
    </div>
  )
}

export default ComputerBoard