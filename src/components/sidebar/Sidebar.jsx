import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import { Link } from "react-router-dom";
import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/darkModeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogout = () => {
    // Clear user-related data from local storage
    localStorage.clear();

    // Navigate to "/sign-in"
    navigate("/sign-in");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Bed Sync</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/AdminUsers" style={{ textDecoration: "none" }}>
            <li>
            <PersonIcon className="icon" />
            <span>Users</span>
            </li>
          </Link>
          <Link to="/AdminWards" style={{ textDecoration: "none" }}>
            <li>
              <ApartmentIcon className="icon" />
              <span>Ward</span>
            </li>
          </Link>
          <Link to="/AdminBeds" style={{ textDecoration: "none" }}>
          <li>
            <LocalHotelIcon className="icon" />
            <span>Bed </span>
          </li>
          </Link>
          <Link to="/AdminPatients" style={{ textDecoration: "none" }}>
          <li>
            <Diversity3OutlinedIcon className="icon" />
            <span>Patient </span>
          </li>
          </Link>

          
          <Link to = "/hospital-form">
             <li>
            <GroupAddOutlinedIcon className="icon" />
            <span>Staff </span>
          </li>
          </Link>
         
          <li>
            <p className="title">Service</p>
          </li>
          <li>
            <SettingsApplicationsOutlinedIcon className="icon" />
            <span>Settings</span>
          </li>
          <li onClick={handleLogout}>
            <LogoutOutlinedIcon className="icon" />
            <span>Log out</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
      <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
