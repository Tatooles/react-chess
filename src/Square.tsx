import Piece from "./Piece"

interface SquareProps {
  i: number;
  piece: any;
}

const Square = ({ i, piece }: SquareProps) => {

  const isBlack = (i: number) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (x + y) % 2 === 0;
  }
  return (
    <div className={`text-center align-middle justify-items-center ${isBlack(i) ? "bg-[#ebebd0]" : "bg-[#779556]"}`}>
      {piece
        ? <Piece piece={piece} />
        : <span>&nbsp;</span>
      }
    </div>
  )
}

export default Square