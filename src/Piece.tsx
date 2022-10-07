import BlackBishop from './assets/black_bishop.png';
import WhiteBishop from './assets/light_bishop.png';
import BlackKing from './assets/black_king.png';
import WhiteKing from './assets/light_king.png';
import BlackQueen from './assets/black_queen.png';
import WhiteQueen from './assets/light_queen.png';
import BlackPawn from './assets/black_pawn.png';
import WhitePawn from './assets/light_pawn.png';
import BlackKnight from './assets/black_knight.png';
import WhiteKnight from './assets/light_knight.png';
import BlackRook from './assets/black_rook.png';
import WhiteRook from './assets/light_rook.png';

const Piece = ({ piece }: any) => {
  const getPiece = (piece: string, color: string) => {
    //Gonna need new icons, pawn and bishop too similar
    switch (piece) {
      case "p":
        return color == 'w' ? WhitePawn : BlackPawn;
      case "r":
        return color == 'w' ? WhiteRook : BlackRook;
      case "b":
        return color == 'w' ? WhiteBishop : BlackBishop;
      case "q":
        return color == 'w' ? WhiteQueen : BlackQueen;
      case "n":
        return color == 'w' ? WhiteKnight : BlackKnight;
      case "k":
        return color == 'w' ? WhiteKing : BlackKing;
      default:
        return piece
    }
  }
  return (
    <div><img src={getPiece(piece.type, piece.color)}></img></div>
  )
}

export default Piece