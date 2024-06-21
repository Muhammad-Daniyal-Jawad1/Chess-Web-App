import "./Sidebar.scss";
import logout from "../../logout"
import { Link } from "react-router-dom"

const Sidebar = (props) => {
    const userFunctions = ["Game","GameHistory"];
  
return (
    <div className="sidebar">
        <div className="top">
            <span className="logo">ChessHub</span>
        </div>
        <hr />
        <div className="center">
        <ul>
            <p className="title">MAIN</p>
            {userFunctions.map((func, index) => (
                <li key={index}>
                    <span>
                      <Link to={`/${func}`}>{func}</Link>                   
                    </span>
                </li>
            ))}
          
          <p className="title">USER</p>
          <li>
            <span>Profile</span>
          </li>
          <li>
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;