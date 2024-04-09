import React, { useEffect, useState } from "react";
import HomePageImage from "../../images/homePageImage.png";
import Circle from "../circle/circle";
import ListVideo from "../videos/listVideo";
import { GETVIDEOS } from "../../utils/FetchFromApi";

function HomePage() {
  const [videos, setVideos] = useState(false);
  useEffect(() => {
    GETVIDEOS().then((res) => {
      console.log(res)
      setVideos(res.videos);
    }).catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <div className="relative pt-[5rem] sm:mx-auto sm:container ">
      <div
        className="hero h-[325px] w-full rounded-[1rem] border-2 border-primary"
        style={{
          backgroundImage:
            `url(${HomePageImage})`,
        }}
      >
       
      </div>
      <Circle left="10%" />
      <Circle left="80%" top="70%" />
      {
        videos ?  <ListVideo listVideos={videos}/> : ""
      }
    </div>
  );
}

export default HomePage;
