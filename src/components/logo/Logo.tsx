import { Link } from "react-router";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <Link to="/">
      <div className="text-2xl font-bold text-red-600 cursor-pointer">
        <p className=" font-bold font-secondary text-2xl text-red ">
          New's{" "}
          <span className="bg-red-500 text-white font-bold font-secondary text-2xl px-2 rounded ">
            Portal
          </span>{" "}
        </p>
      </div>
    </Link>
  );
};

export default Logo;
