import { ScaleLoader } from "react-spinners"

const Loader = () => {
  return (
    <div className="w-full h-screen bg-white absolute top-0 left-0 flex items-center justify-center">
      <ScaleLoader color="#FF0000" className="w-10 h-10" />
    </div>
  )
}

export default Loader