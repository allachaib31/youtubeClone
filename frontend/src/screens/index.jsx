import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { Outlet } from "react-router-dom";
import { socket } from "../socket/socket";
import { VALIDATESESSION } from "../utils/FetchFromApi";

export const UserContext = React.createContext();

function Home() {
  const [reload, setReload] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    VALIDATESESSION()
      .then((res) => {
        console.log(res);
        setUserInfo(res.info);
        setReload((e) => !e);
        socket.on("connect", (io)=>{
        })
        socket.emit("joinRoom");
      })
      .catch((err) => {
        window.location.href = "/auth";
      });
      return () => {
        if(socket.readyState === 1) {
          socket.close()
        }
      };
  }, []);
  return (
    <div className="text-primary">
      {reload ? (
        <div className="h-screen flex items-center justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          {" "}
          <UserContext.Provider value={userInfo}>
            <Header />
            <Outlet />
          </UserContext.Provider>
        </>
      )}
    </div>
  );
}

export default Home;
