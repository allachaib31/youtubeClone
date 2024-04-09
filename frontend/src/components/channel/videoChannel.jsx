import React, { useContext } from "react";
import { ChannelContext } from "./channel";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DELETEVIDEO } from "../../utils/FetchFromApi";
import { Link } from "react-router-dom";
function VideoChannel() {
  const channel = useContext(ChannelContext);
  const deleteVideo = (id) => {
    DELETEVIDEO(id)
      .then((res) => {
        document.getElementById("my_modal_1").close();
        window.location.href = "/channel";
      })
      .catch((err) => {
        document.getElementById("my_modal_1").close();
        alert("try again!!");
      });
  };
  return (
    <div>
      <div className="px-[1rem] backdrop-blur-sm bg-[#403F3F]/30 mt-[2rem] py-[2rem] rounded-md">
        <div className="flex justify-center sm:items-center flex-wrap gap-[1rem] md:gap-[2rem] mt-3">
          {channel && channel.videoChannel && channel.videoChannel
            ? channel.videoChannel.map((video) => (
                <div className="cursor-pointer flex-col rounded-md">
                  <Link to={"/video?idVideo="+ video._id}>
                    <img
                      className="w-screen h-[13rem] sm:w-[16.6875rem] sm:h-[9.37500rem]"
                      src={video.thumbnail}
                      alt=""
                    />
                  </Link>
                  <div className="flex justify-between items-center">
                    <Link to={"/video?idVideo="+ video._id}>
                      {" "}
                      <h1 className="text-white mt-1">{video.title}</h1>
                      <span className="text-[#ffffffaf]">
                        {video.vues} views
                      </span>
                    </Link>
                    <FontAwesomeIcon
                      onClick={() => {
                        if (
                          window.confirm(
                            "are you sure you want to delete this video!!"
                          )
                        ) {
                          document.getElementById("my_modal_1").showModal();
                          deleteVideo(video._id);
                        }
                      }}
                      icon={faTrash}
                      className="text-error"
                    />
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete video!</h3>
          <progress className="progress w-full"></progress>
        </div>
      </dialog>
    </div>
  );
}

export default VideoChannel;
