import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SEARCH } from "../../utils/FetchFromApi";
import ListVideo from "../videos/listVideo";
import HomePageImage from "../../images/homePageImage.png";
import Circle from "../circle/circle";

function SearchVideo() {
  const [searchParams] = useSearchParams();
  const [videosSearch, setVideosSearch] = useState(false);
  const keywords = searchParams.get("search");
  useEffect(() => {
    SEARCH(keywords)
      .then((res) => {
        setVideosSearch(res.videosWithKeywords);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keywords]);
  return <div className="relative pt-[5rem] sm:mx-auto sm:container">
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
        videosSearch ? <ListVideo listVideos={videosSearch}/> : ""
    }
  </div>;
}

export default SearchVideo;
