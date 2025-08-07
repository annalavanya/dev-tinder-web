import {useState} from 'react'
import axios from 'axios';
import { BASE_URL } from '../utility/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utility/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

const [emailId, setEmail] = useState('lavanya@gmail.com');
const [password, setPassword] = useState('Lavanya@123');

const dispatch = useDispatch();
const navigate = useNavigate();

const createLogin = async () => {
    console.log(emailId, password)
    try {
        const res = await axios.post(BASE_URL + '/login', 
            { emailId, password }, 
            { withCredentials: true }
        );
        dispatch(addUser(res?.data));
        return navigate("/");
    } catch(err) {
        console.error(err);
    }
}

  return (
    <div>
        <div className='bg-gray-900 w-120 h-80 shadow-2xl m-auto mt-15 rounded-2xl'>
            <div className='space-y-4'>
                <div className='flex flex-col pt-10 m-5 p-3'>
                    <label htmlFor='email' className='align-left m-2 font-bold'>Email ID</label>
                    <input type="email" 
                        id="email"
                        name="email"
                        value = {emailId}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-700 h-9 w-100 p-4 m-2 rounded-sm'
                    />
                    <label htmlFor='password' className='align-left m-2 font-bold'>Password</label>
                    <input type="password"
                        id="password" 
                        name="password"
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-700 h-9 w-100 p-4 m-2 rounded-sm'
                    />
                </div>
                    <div className='flex justify-end-safe pr-10'>
                        <button 
                            type="button"
                            onClick={createLogin}
                            className='m-1 mb-3 w-18 h-10 bg-gray-500 rounded-xl cursor-pointer'>
                            LOGIN
                        </button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Login