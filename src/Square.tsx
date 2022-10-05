import Piece from "./Piece"

interface SquareProps {
  i: number;
  piece: any;
}

const Square = ({ i, piece }: SquareProps) => {
  return (
    <>
      {piece ? <div className="bg-white">{piece ? piece.square : null}</div> : <div className="bg-white"><span>&nbsp;</span></div>
      }
    </>
  )
}

export default Square