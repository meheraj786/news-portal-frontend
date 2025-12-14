import logo2 from "../../assets/logo2.png";
import { Link } from "react-router";
const Logo = () => {
  return (
    <Link to="/">
      <div className=" ">
        <img className="object-cover w-45 " src={logo2} alt="" />
      </div>
    </Link>
  );
};

export default Logo;
