import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utility/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utility/userSlice';
import UserCard from './userCard';

const Profile = () => {
  const user = useSelector((store) => store?.user);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [skills, setSkills] = useState(user?.skills);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();

  console.log(firstName, lastName, age,gender,photoUrl,about,skills);

  const updateUser = async () => {
    try {
      const res = await axios.patch(BASE_URL + '/profile/edit', 
        { firstName, lastName, age, gender, photoUrl, about, skills }, 
        { withCredentials: true });
      console.log(res.data);
      dispatch(addUser(res?.data?.data));
    } catch(err) {
      console.log(err);
      // setError();
    }
  }

  return (
  <div>
    <p className='flex justify-center mt-5 font-bold'>Update page</p>
    <div className="flex justify-center flex-row my-6">
      <div className="flex flex-col border border-gray-700 px-8 py-5">
        <label className="label">First Name</label>
        <input type="text" className="input mb-2" value={firstName} onChange={(e) => setFirstName(e.target.firstName)}/>
        <label className="label">Last Name</label>
        <input type="text" className="input mb-2" value={lastName} onChange={(e) => setLastName(e.target.lastName)}/>
        <label className="label">Age</label>
        <input type="number" className="input mb-2" value={age} onChange={(e) => setAge(e.target.age)}/>
        <label className="label">Gender</label>
        <input type="text" className="input mb-2" value={gender} onChange={(e) => setGender(e.target.gender)}/>
        <label className="label">PhotoUrl</label>
        <input type="text" className="input mb-2" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.photoUrl)}/>
        <label className="label">About</label>
        <input type="text" className="input mb-2" value={about} onChange={(e) => setAbout(e.target.about)}/>
        <label className="label">Skills</label>
        <input type="text" className="input mb-4" value={skills} onChange={(e) => setSkills(e.target.skills)}/>
        <button className='flex justify-center bg-emerald-500 p-2 rounded-2xl w-24 cursor-pointer' onClick={updateUser}>Update</button>
      </div>

      <div className='flex flex-col border border-gray-700 px-8 py-5'>
        <div className='flex justify-center'>
          <img src={photoUrl} alt='image' className='w-48 mt-4 rounded-2xl'/>
        </div>
        <p className='text-center font-bold p-1'>{firstName + " " + lastName}</p>
        <p className='text-center font-bold p-1'>{age}</p>
        <p className='text-center font-bold p-1'>{gender}</p>
        { about && <p className='text-xs ml-3 justify-normal'>{about}</p>}
        { skills && <p>{skills.join(', ')}</p>}
      </div>

    </div>
  </div>
  )
}

export default Profile