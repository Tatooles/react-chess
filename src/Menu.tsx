const Menu = ({ showBoard, onHide }: any) => {
  if (showBoard) return null;

  return (
    <div className="text-center w-[352px] h-[352px] md:w-[504px] md:h-[504px] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <h1 className="p-10 mb-10 font-bold text-3xl">Welcome to Chess Online!</h1>
      <button className="p-10 rounded-md bg-green-400 text-white font-bold text-lg w-1/2" onClick={onHide}>Start</button>
    </div >
  )
}

export default Menu;