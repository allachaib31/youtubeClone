import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ADDCOMMENT,
  ADDDISLIKE,
  ADDLIKE,
  GETVIDEO,
} from "../../utils/FetchFromApi";
import videoImage from "../../images/videoImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faPaperPlane,
  faPause,
  faPlay,
  faRotateLeft,
  faRotateRight,
  faThumbsDown,
  faThumbsUp,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../screens";
import Circle from "../circle/circle";
import { Link } from "react-router-dom";

function WatchVideo() {
  const user = useContext(UserContext);
  const [reload, setReload] = useState(true);
  const [video, setVideo] = useState({});
  const [listVideo, setListVideo] = useState([]);
  const [play, setPlay] = useState(false);
  const [mute, setMute] = useState(false);
  const [numberOfComment, setNumberOfComment] = useState(0);
  const [numberOfLike, setNumberOfLike] = useState(0);
  const [numberOfDislike, setNumberOfDislike] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const url = new URL(window.location.href);
  const idVideo = url.searchParams.get("idVideo");
  const videoRef = useRef(null);
  const [comment, setComment] = useState({
    text: "",
    idVideo: idVideo,
  });
  const [displayComments, setDisplayComments] = useState([]);

  useEffect(() => {
    GETVIDEO(idVideo)
      .then((res) => {
        console.log(res);
        setVideo(res.result);
        setListVideo(res.listVideo);
        setDisplayComments(res.comments);
        setNumberOfComment(res.result.comment);
        setNumberOfLike(res.result.likes);
        setNumberOfDislike(res.result.dislikes);
        setReload((e) => !e)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idVideo]);

 
  const sendComment = () => {
    console.log(comment);
    ADDCOMMENT(comment)
      .then((res) => {
        console.log(res);
        setNumberOfComment((e) => e + 1);
        console.log(user);
        setDisplayComments((e) => [
          {
            comment: comment.text,
            idChannel: {
              profileImage: user.channel.profileImage,
              name: user.channel.name,
            },
          },
          ...e,
        ]);
      })
      .catch((err) => {
        alert("You don't have a channel");
      });
  };
  const sendLike = (idVideo) => {
    ADDLIKE({
      idVideo: idVideo,
    })
      .then((res) => {
        console.log(res);
        if (res.msg == "add like") {
          return setNumberOfLike((e) => e + 1);
        }
        setNumberOfLike((e) => e - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendDislike = (idVideo) => {
    ADDDISLIKE({
      idVideo: idVideo,
    })
      .then((res) => {
        console.log(res);
        if (res.msg == "add dislikes") {
          return setNumberOfDislike((e) => e + 1);
        }
        setNumberOfDislike((e) => e - 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {reload ? (
        <div className="h-screen flex items-center justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div
          className={`flex flex-col xl:flex-row ${
            !fullScreen ? "pt-[66px] z-0" : "pt-0 z-[9999] relative"
          }`}
        >
          <Circle left="10%" />
          <Circle left="80%" top="70%" />
          <div className="lg:w-[calc(100vw_-_20%)]">
            {video && (
              <div
                id="container"
                className={` ${
                  !fullScreen ? "w-full h-[40%]" : "w-screen h-screen"
                } rounded-lg `}
              >
                  <video
                    src={video.videoUrl}
                    controls
                    autoplay
                    className="w-full h-full bg-black"
                  />
              </div>
            )}
            {video.idChannel && (
              <div className="text-white w-full h-[40%]">
                <div className="pt-[1rem] flex md:flex-row flex-col md:items-center justify-between">
                  <div className="pl-[1rem]">
                    <h1 className="text-3xl font-bold">{video.title}</h1>
                    <span className="text-[#ffffff86] font-bold">
                      {video.vues} views
                    </span>
                    <div className="flex mt-5 items-center gap-2 md:gap-5">
                      <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={video.idChannel.profileImage} />
                        </div>
                      </div>
                      <div className="flex md:flex-col flex-row justify-center">
                        <h1 className="font-bold md:text-2xl">
                          {video.idChannel.name}
                        </h1>
                        <div className="flex md:flex-row flex-col md:items-center gap-5">
                          <span className="text-[#ffffff86] font-bold">
                            {video.idChannel.numberOfSubscribes} Subscribes
                          </span>
                          {/*video.idChannel._id != user.channel._id ? (
                            <button className="btn btn-primary font-bold text-[1rem]">
                              Subscribe
                            </button>
                          ) : (
                            ""
                          )*/}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:mt-0 mt-3 gap-3">
                    <button
                      onClick={() => {
                        sendLike(video._id);
                      }}
                      className="btn btn-primary text-3xl"
                    >
                      <FontAwesomeIcon icon={faThumbsUp} color="black" />
                      {numberOfLike}
                    </button>
                    <button
                      onClick={() => {
                        sendDislike(video._id);
                      }}
                      className="btn btn-outline btn-primary text-3xl"
                    >
                      <FontAwesomeIcon icon={faThumbsDown} /> {numberOfDislike}
                    </button>
                  </div>
                </div>
                <div className="px-[1rem] backdrop-blur-sm bg-[#403F3F]/30 mt-[2rem] py-[2rem] rounded-md">
                  <h1 className="text-2xl font-bold">
                    {numberOfComment} comments
                  </h1>
                  <div className="mt-2 flex gap-5 items-center">
                    <div className="avatar">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={
                            user.channel && user.channel.profileImage
                              ? user.channel.profileImage
                              : `https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg`
                          }
                        />
                      </div>
                    </div>
                    <textarea
                      className="bg-transparent resize-none w-full h-8 border-b-2 outline-none"
                      placeholder="Your comment ....."
                      onChange={(com) => {
                        setComment((e) => {
                          return { ...e, text: com.target.value };
                        });
                      }}
                    ></textarea>
                    <button className="btn btn-primary" onClick={sendComment}>
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </div>
                  <div className="mt-6 flex flex-col gap-6">
                    {displayComments &&
                      displayComments.map((comment) => (
                        <div className="flex gap-4">
                          <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={comment.idChannel.profileImage} />
                            </div>
                          </div>
                          <div>
                            <h1 className="font-bold text-xl">
                              {comment.idChannel.name}
                            </h1>
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="xl:w-[20%] flex xl:flex-col gap-5 p-5 flex-wrap xl:gap-5 self-start">
            {listVideo &&
              listVideo.map((video) => (
                <div className="cursor-pointer" onClick={() => window.location.href = "/video?idVideo=" + video._id}>
                  <img src={video.thumbnail} alt="" />
                  <h1 className="text-white mt-1">{video.title}</h1>
                  <span className="text-[#ffffffaf]">{video.vues} views</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default WatchVideo;
