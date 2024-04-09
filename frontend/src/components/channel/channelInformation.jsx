import React, { useContext } from "react";
import { ChannelContext } from "./channel";
import { Link } from "react-router-dom";
function ChannelInformation() {
  const channel = useContext(ChannelContext);
  console.log(channel);
  return (
    <>
      {channel && (
        <div>
          <div
            className="hero h-[325px] w-full rounded-[1rem] border-2 border-primary"
            style={{
              backgroundImage: `url(${channel.channel.coverImage})`,
            }}
          ></div>
          <div className="flex items-center mt-[2rem] gap-[3rem]">
            <div className="avatar">
              <div className="w-[10rem] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={channel.channel.profileImage} />
              </div>
            </div>
            <div className="text-white">
              <h1 className="font-bold text-2xl">{channel.channel.name}</h1>
              <h2 className="text-[#ffffffaf]">
                {channel.channel.numberOfSubscribes} subscribers
              </h2>
              <p>{channel.channel.description}</p>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center gap-5 mt-[2rem]">
            <div className="flex gap-2">
              <Link
                to={"/channel?idChannel=" + channel.channel._id}
                className="badge badge-primary py-3 text-[1rem] font-bold cursor-pointer"
              >
                video
              </Link>
              <Link
                to="/channel/uploadVideo"
                className="badge badge-primary py-3 text-[1rem] font-bold cursor-pointer"
              >
                uploadVideo
              </Link>
            </div>
          </div>
          <hr className="mt-[1rem] h-[0.1rem] bg-primary" />
        </div>
      )}
    </>
  );
}

export default ChannelInformation;
