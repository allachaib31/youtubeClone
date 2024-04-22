import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  faHouse,
  faUser,
  faClockRotateLeft,
  faCirclePlay,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../screens";
import { LOGOUT } from "../../utils/FetchFromApi";

function Header({setSearchText}) {
  const user = useContext(UserContext);
  const logout = () => {
    LOGOUT()
      .then(() => {
        window.location.href = "/auth";
      })
      .catch(() => {
        alert("try again");
      });
  };
  return (
    <div className="fixed z-[999] navbar bg-black">
      <div className="z-[1000]  navbar-start">
        <div className="">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}

            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu gap-5 p-4 w-80 min-h-full bg-base-200 text-base-content">
              <div className="avatar flex flex-col gap-3 mx-auto">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user.channel && user.channel.profileImage
                        ? user.channel.profileImage
                        : `https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg`
                    }
                  />
                </div>
                <h1 className="text-center font-bold text-xl">
                  {user.channel && user.channel.name
                    ? user.channel.name
                    : user.user.username}
                </h1>
              </div>{" "}
              <hr className="bg-primary h-[0.1rem]" />
              <ul>
                {/* Sidebar content here */}
                <li>
                  <Link to="/">
                    <FontAwesomeIcon icon={faHouse} fontSize="1.5rem" />{" "}
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/channel?idChannel=${
                      user.channel && user.channel._id
                    }`}
                  >
                    <FontAwesomeIcon icon={faUser} fontSize="1.5rem" />{" "}
                    <span>You</span>
                  </Link>
                </li>
                <li>
                  <Link to="/history">
                    <FontAwesomeIcon
                      icon={faClockRotateLeft}
                      fontSize="1.5rem"
                    />{" "}
                    <span>History</span>
                  </Link>
                </li>
                {/*<li>
                  <Link to="/dashboard/schedule">
                    <FontAwesomeIcon icon={faCirclePlay} fontSize="1.5rem" />{" "}
                    <span>Subscriptions</span>
                  </Link>
  </li>*/}
              </ul>
              <button
                onClick={logout}
                className="btn btn-outline btn-primary w-[10rem]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="btn btn-ghost hidden sm:flex text-white text-3xl"
        >
          <span className="font-bold text-primary">DZ</span> Tube
        </Link>
      </div>
      <div className="navbar-end flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchText((text) => {
              return e.target.value
            })}
            className="input input-bordered w-50 md:w-auto font-bold text-white"
          />
        </div>
        <Link to="/channel/uploadVideo">
          <FontAwesomeIcon
            icon={faVideo}
            fontSize="2rem"
            className="text-white hover:text-primary cursor-pointer"
          />
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user.channel && user.channel.profileImage
                    ? user.channel.profileImage
                    : `https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg`
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 text-white z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li className="font-bold">
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
