import Piece from './Piece'

interface SquareProps {
  squareClicked: Function;
  active: boolean;
  previous: boolean;
  i: number;
  piece: any;
}

const Square = ({ squareClicked, active, previous, i, piece }: SquareProps) => {

  const isBlack = (i: number) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    return (x + y) % 2 === 0;
  }

  return (
    <div onClick={() => squareClicked(i, piece)} className={`w-[44px] h-[44px] md:w-[63px] md:h-[63px] text-center align-middle justify-items-center ${active ? 'border-4 border-green-500' : ''} ${previous && !isBlack(i) ? '!bg-[#ff3636]' : ''} ${previous && isBlack(i) ? '!bg-[#f55858]' : ''} ${isBlack(i) ? 'bg-[#ebebd0]' : ' bg-gray-500'}`}>
      {piece
        ? <Piece piece={piece} />
        : <span>&nbsp;</span>
      }
    </div>
  )
}

export default Square