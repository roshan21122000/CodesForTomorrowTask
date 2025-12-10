import "./Topbar.css";
import { FaCircleUser } from "react-icons/fa6";

const Topbar: React.FC = () => {
  return (
    <div className="topbar">
      <input className="search" placeholder="Search" />
      <FaCircleUser className="profile" />
    </div>
  );
};

export default Topbar;
