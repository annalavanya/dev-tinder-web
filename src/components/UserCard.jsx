
const UserCard = (props) => {
    const { firstName, lastName, photoUrl, skills, about } = props?.data;

  return (
    <div className='m-3'>
        <div className='bg-base-300 w-56 my-7 shadow-2xl rounded-2xl'>
        <div className='flex justify-center'>
          <img src={photoUrl} alt='image' className='w-48 mt-4 rounded-2xl'/>
        </div>
        <p className='text-center font-bold p-1'>{firstName + " " + lastName}</p>
        { about && <p className='text-xs ml-3 justify-normal'>{about}</p>}
        { skills && <p>{skills.join(', ')}</p>}
        <div className='flex justify-between m-3 mt-20'>
          <button className='w-22 h-8 bg-pink-500 rounded-2xl m-r2 cursor-pointer hover:bg-pink-600'>Interested</button>
          <button className='w-22 h-8 bg-purple-500 rounded-2xl cursor-pointer hover:bg-purple-600'>Ignored</button>
        </div>
      </div>
    </div>
    )
}

export default UserCard;