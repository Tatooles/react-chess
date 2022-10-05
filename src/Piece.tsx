const Piece = ({ piece }: any) => {
  const getPiece = (piece: string) => {
    // Gonna need new icons, pawn and bishop too similar
    switch (piece) {
      case "p":
        return "&#9817;";
      case "r":
        return "&#9814;";
      case "b":
        return "&#9815;";
      case "q":
        return "&#9813;";
      case "n":
        return "&#9816;";
      case "k":
        return "&#9812;";
      default:
        return piece
    }
  }
  return (
    <div dangerouslySetInnerHTML={{ __html: getPiece(piece.type) }} className={piece.color === 'w' ? 'text-white' : 'text-black'}></div>
  )
}

export default Piece