import {useState} from 'react'
import axios from 'axios';
import { BASE_URL } from '../utility/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utility/userSlice';
import { useNavigate } from 'react-router-dom';
import { passwordIconObj } from '../utility/constant';

const Login = () => {

    const [emailId, setEmail] = useState('jeya@yopmail.com');
    const [password, setPassword] = useState('Jeya@123');
    const [error, setError] = useState("");
    const [boolIcon, setBoolIcon] = useState(true);
    const [passwordIcon, setPasswordIcon] = useState(passwordIconObj[boolIcon]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // password Icon
    function showPasswordIcon() {
        setBoolIcon(!boolIcon);
        setPasswordIcon(passwordIconObj[!boolIcon]);
    }

    const createLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + '/login', 
                { emailId, password }, 
                { withCredentials: true }
            );
            dispatch(addUser(res?.data));
            return navigate("/");
        } catch(err) {
            setError(err?.response.data);
        }
    }

    return (
        <div>
            <div className='bg-base-300 w-80 h-90 shadow-2xl m-auto mt-15 rounded-2xl'>
                <h3 className='font-bold text-xl flex justify-center pt-4'>Login</h3>
                <div className='flex flex-col justify-center pt-3 m-4 p-2'>
                    <label className='align-left m-2 font-bold'>Email ID</label>
                    <input type="email" 
                        value = {emailId}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-gray-700 h-9 w-65 p-2 m-2 rounded-sm'
                    />
                    <label className='align-left m-2 font-bold'>Password</label>
                    <div className='relative w-20'>
                        <input type = {boolIcon ? "password" : "text" }
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='bg-gray-700 h-9 w-65 p-2 m-2 rounded-sm'
                        />
                        <span>
                            <img src={passwordIcon} alt='showIcon'
                            onClick={showPasswordIcon}
                            className='absolute -right-44 top-4 w-5 h-5 rounded-2xl cursor-pointer invert'
                        />
                        </span>
                    </div>
                <p className='text-red-600'>{error}</p>
                </div>
                    <div className='flex justify-end-safe pr-10'>
                        <button 
                            type="button"
                            onClick={createLogin}
                            className='m-1 mb-3 w-18 h-10 bg-emerald-700 rounded-xl cursor-pointer'>
                            LOGIN
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default Login