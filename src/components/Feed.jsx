import axios from "axios"
import { BASE_URL } from "../utility/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utility/feedSlice";
import UserCard from "./userCard"; 

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);

  console.log("feed", feed.data);

  const getFeed = async() => {
    try {
      const res = await axios.get(BASE_URL + '/feed', {withCredentials: true});
      console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-row flex-wrap m-4">
      {
        feed?.data && feed?.data.map((f) => <UserCard key={f?._id} data = {f}/>)
      }
    </div>
  )
}

export default Feed