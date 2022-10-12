const Menu = ({ showBoard, hideMenu }: any) => {
  if (showBoard) return null;

  return (
    <div className="text-center w-[352px] h-[352px] md:w-[504px] md:h-[504px] mx-auto">
      <h1 className="p-10 mb-10 font-bold text-3xl">Welcome to Chess Online!</h1>
      <button className="p-10 rounded-md bg-green-400 text-white font-bold text-lg w-1/2" onClick={hideMenu}>Start</button>
    </div >
  )
}

export default Menu;