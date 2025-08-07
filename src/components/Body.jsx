import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utility/constant'
import { addUser } from '../utility/userSlice'

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user);

  const userDetails = async () => {
    try {
      if (user) return;
      const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
      dispatch(addUser(res?.data));
    } catch (err) {
      if (err?.status === 401) return navigate("/login");
      console.log(err);
    }
  }

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body