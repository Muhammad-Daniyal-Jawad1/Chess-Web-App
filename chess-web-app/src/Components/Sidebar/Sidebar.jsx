import "./Sidebar.scss";
import logout from "../../logout"

const Sidebar = (props) => {
    const userFunctions = ["Queue for Match","View Previous Matches"];
  
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
                        {func}                     
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