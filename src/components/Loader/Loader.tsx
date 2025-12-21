import { ScaleLoader } from "react-spinners"

const Loader = () => {
  return (
    <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center">
      <ScaleLoader color="#FF0000" />
    </div>
  )
}

export default Loader