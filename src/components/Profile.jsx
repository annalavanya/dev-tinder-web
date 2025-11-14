import axios from 'axios';
import { useState, useEffect } from 'react'
import { BASE_URL } from '../utility/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utility/userSlice';

const Profile = () => {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setAge(user.age || '');
      setGender(user.gender || '');
      setPhotoUrl(user.photoUrl || '');
      setAbout(user.about || '');
      setSkills(user.skills || '');
    }
  }, [user]);

  useEffect(() => {
    if(show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show]);
  

  const updateUser = async () => {
    try {
      const res = await axios.patch(BASE_URL + '/profile/edit', 
        { firstName, lastName, age, gender, photoUrl, about, skills }, 
        { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      setShow(true);
    } catch(err) {
      console.log(err?.response);
      setError(err?.response);
    }
  }

  if(!user) return (
    <div> <h4>Page Loading...</h4></div>
  )

  return (
    <>
      <div className='flex justify-center mt-5'>
        <h3 className='text-2xl text-emerald-500 font-bold'>Profile Update</h3>
      </div>

      <div className='flex flex-row justify-center mt-7 shadow-lg'>
      <div className='w-96 border border-cyan-900 p-4'>

        <div className='flex flex-row justify-between mb-5 mt-3'>
          <label className='font-bold'>First Name</label>
          <input 
            type="text"
            value={firstName}
            className='border border-cyan-900 p-1 px-2 w-64'
            onChange={(e) => setFirstName(e.target.value)}
           />
        </div>

        <div className='flex flex-row justify-between mb-5'>
          <label className='font-bold'>Last Name</label>
          <input 
            type="text"
            value={lastName}
            className='border  border-cyan-900 p-1 px-2 w-64'
            onChange={(e) => setLastName(e.target.value)}
           />
        </div>

        <div className='flex flex-row justify-between mb-5'>
          <label className='font-bold'>Age</label>
          <input 
            type="text"
            value={age}
            className='border  border-cyan-900 p-1 px-2 w-64'
            onChange={(e) => setAge(e.target.value)}
           />
        </div>

         <div className='flex flex-row justify-between mb-5'>
          <label className='font-bold'>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className='border border-cyan-900 p-1 px-2 w-64'
          >
            <option className="text-cyan-400" value="">Select Gender</option>
            <option className="text-blue-600" value="male">Male</option>
            <option className="text-pink-400" value="female">Female</option>
            <option className="text-emerald-400" value="other">Other</option>
          </select>
        </div>


        <div className='flex flex-row justify-between mb-5'>
          <label className='font-bold'>Photo Url</label>
          <input 
            type="text"
            value={photoUrl}
            className='border  border-cyan-900 p-1 px-2 w-64'
            onChange={(e) => setPhotoUrl(e.target.value)}
           />
        </div>

        <div className='flex flex-row justify-between mb-5'>
          <label className='font-bold'>About</label>
          <input 
            type="text"
            value={about}
            className='border  border-cyan-900 p-1 px-2 w-64'
            onChange={(e) => setAbout(e.target.value)}
           />
        </div>

        <div className='flex flex-row justify-between mb-5'>
          <label className='font-bold'>Skills</label>
          <textarea 
            value={skills}
            className='border  border-cyan-900 p-1 px-2 w-64'
            onChange={(e) => setSkills(e.target.value)}
           />
        </div>

        <button className='bg-emerald-800 h-10 p-2 rounded-2xl cursor-pointer'
        onClick={updateUser}
        >UPDATE</button>

    </div>
      <div className='w-96 border border-cyan-900'>
        <div className='flex flex-col justify-center'>
          {
            photoUrl && <img className="h-65 mb-3" src={photoUrl} alt="User-Image"/>
          }
        </div>
        <div className='flex flex-col justify-center'>
          <h5 className='font-bold text-green-700 text-2xl text-center'>{firstName + " " + lastName}</h5>
          <h5 className='font-bold  text-emerald-600 text-xl text-center'>{age}</h5>
          <h5 className='font-bold  text-emerald-600 text-xl text-center'>{gender}</h5>
          <div className='mx-8'>
            <h5 className='font-bold text-center text-emerald-500 mb-4 w-80'>{about}</h5>
            <h5 className='font-bold text-center text-emerald-500 w-80'>{skills}</h5>
          </div>
        </div>
      </div>
    </div> 

    {
      show && (
        <div className='flex justify-center fixed bottom-6 left-0 right-0 z-50 shadow-lg'>
          <p className='w-96 p-3 ml-4 border border-green-800 bg-emerald-500 text-black rounded-2xl flex flex-row'>{
            error ? error : "Profile updated successfully!"
            }<span className='w-4 justify-end ml-35 cursor-pointer'><img 
            src="https://png.pngtree.com/png-vector/20220609/ourmid/pngtree-crossing-and-background-cross-way-png-image_4945549.png"
            alt='cross-mark'
            onClick={() => setShow(false)}
            />
            </span></p>
        </div>
      )
    }

    </>
  )
}

export default Profile