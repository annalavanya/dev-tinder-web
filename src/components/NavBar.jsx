import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utility/constant";
import { removeUser } from "../utility/userSlice";

const NavBar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, {withCredentials: true});
      dispatch(removeUser());
      return navigate("/login");
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👩‍💻 DevTinder</Link>
      </div>
      <div className="flex gap-2 mx-5">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {
                user &&
                <div className="w-10 rounded-full flex flex-row">
                    <img alt="user" src={user?.photoUrl} />
                </div>
            }
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-25 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li><Link>Settings</Link></li>
            <li><Link onClick={userLogout}>Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>  
  )
}

export default NavBar