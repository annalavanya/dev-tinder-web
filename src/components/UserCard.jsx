import axios from "axios";
import { BASE_URL } from "../utility/constant";

const UserCard = (props) => {
    const { _id, firstName, lastName, photoUrl, skills, about } = props?.data;

    async function addInterested() {
      try {
        const res = await axios.post(`${BASE_URL}/sendConnectionRequest/Interested/${_id}`, 
          { withCredentials: true }
        );
        console.log(res?.data?.data);
      } catch(err) {
        console.log(err?.response);
      }
    }

  return (
    <div className='m-3'>
        <div className='bg-base-300 w-56 my-7 shadow-2xl rounded-2xl'>
        <div className='flex justify-center'>
          <img src={photoUrl} alt='image' className='w-48 mt-4 rounded-2xl'/>
        </div>
        <p className='text-center font-bold p-1'>{firstName + " " + lastName}</p>
        { about && <p className='text-xs ml-3 justify-normal'>{about}</p>}
        { skills && <p className="text-m ml-3">{skills.join(', ')}</p>}
        <div className='flex flex-row justify-between mt-5'>
          <button 
            className='p-2 mx-3 my-5 bg-pink-500 rounded-2xl cursor-pointer hover:bg-pink-600'
            onClick={addInterested}
            >Interested</button>
          <button className= 'p-2 mx-3 my-5 bg-purple-500 rounded-2xl cursor-pointer hover:bg-purple-600'>Ignored</button>
        </div>
      </div>
    </div>
    )
}

export default UserCard;