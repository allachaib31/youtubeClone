import React from "react";
import videoImage from "../../images/videoImage.png";
import { Link } from "react-router-dom";
function ListVideo({ listVideos }) {
  return (
    <div className="px-[1rem] backdrop-blur-sm bg-[#403F3F]/30 mt-[2rem] py-[2rem] rounded-md">
      <div className=" flex flex-wrap gap-[5rem] mt-3">
        {listVideos.map((video) => (
          <Link to={"/video?idVideo="+ video._id} className="cursor-pointer flex-col rounded-md">
            <img src={video.thumbnail} className="w-screen h-[13rem] sm:w-[16.6875rem] sm:h-[9.37500rem]" alt="" />
            <h1 className="text-white mt-1">{video.title}</h1>
            <span className="text-[#ffffffaf]">{video.vues} views</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListVideo;
