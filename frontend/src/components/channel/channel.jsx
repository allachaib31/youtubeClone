import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GETCHANNEL } from "../../utils/FetchFromApi";
export const ChannelContext = React.createContext();
function Channel() {
  const [channel, setChannel] = useState(null);
  const url = new URL(window.location.href);
  var paramValue = url.searchParams.get("idChannel");
  useEffect(() => {
    GETCHANNEL(paramValue)
      .then((res) => {
        console.log(res)
        setChannel(res);
        if (!window.location.href.includes("/channel?idChannel=")) {
          window.location.href = "/channel?idChannel=" + res.channel._id
        }
      })
      .catch((err) => {
        console.log(err);
        if (!window.location.href.includes("/channel/createChannel")) {
          window.location.href = "/channel/createChannel";
        }
      });
  }, []);
  return (
    <div className="pt-[5rem] ">
      {/* <AddChannel /> */}
      <ChannelContext.Provider value={channel}>
        <Outlet />
      </ChannelContext.Provider>
    </div>
  );
}

export default Channel;
