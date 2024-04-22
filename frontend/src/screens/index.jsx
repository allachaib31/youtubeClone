import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";
import { VALIDATESESSION } from "../utils/FetchFromApi";

export const UserContext = React.createContext();

function Home() {
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [searchText,setSearchText] = useState("");
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
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      // Your code to handle the delayed update of searchText after 1 second
      navigate(`/search?search=${searchText}`);
    }, 1000);

    // Clear the timeout if searchText changes before the 1-second delay
    return () => clearTimeout(delayTimer);
  }, [searchText])
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
            <Header setSearchText={setSearchText}/>
            <Outlet />
          </UserContext.Provider>
        </>
      )}
    </div>
  );
}

export default Home;
