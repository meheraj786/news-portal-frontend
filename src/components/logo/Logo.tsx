import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <p className=" font-bold font-secondary text-2xl text-red ">
        New's{" "}
        <span className="bg-red-500 text-white font-bold font-secondary text-2xl px-2 rounded ">
          Portal
        </span>{" "}
      </p>
    </Link>
  );
};

export default Logo;
