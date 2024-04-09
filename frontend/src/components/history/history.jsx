import React, { useEffect, useState } from 'react'
import { GETHISTORY } from '../../utils/FetchFromApi'
import ListVideo from '../videos/listVideo';
import { Link } from 'react-router-dom';

function History() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    GETHISTORY().then((res) => {
      console.log(res)
      setVideos([...res.history]);
    })
  }, [])
  return (
    <div className="px-[1rem] backdrop-blur-sm bg-[#403F3F]/30 py-[5rem] rounded-md">
      <div className=" flex flex-wrap gap-[5rem] mt-3">
        {videos.map((video) => (
          <Link to={"/video?idVideo="+ video.idVideo._id} className="cursor-pointer flex-col rounded-md">
            <img src={video.idVideo.thumbnail} className="w-screen h-[13rem] sm:w-[16.6875rem] sm:h-[9.37500rem]" alt="" />
            <h1 className="text-white mt-1">{video.idVideo.title}</h1>
            <span className="text-[#ffffffaf]">{video.idVideo.vues} views</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default History