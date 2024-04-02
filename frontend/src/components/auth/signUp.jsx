import React, { useState, useEffect } from "react";
import { SIGNUP } from "../../utils/FetchFromApi";

function SignUp({ setSignIn }) {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "........",
  });
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState({
    status: "",
    text: "",
  });
  const signUpSubmit = () => {
    setSubmit((e) => !e);
    setMessage({
      status: "",
      text: "",
    });
    SIGNUP(inputs)
      .then((res) => {
        setSubmit((e) => !e);
        setMessage({
          status: res.status,
          text: res.message,
        });
      })
      .catch((err) => {
        setSubmit((e) => !e);
        setMessage({
          status: err.response.data.status,
          text: err.response.data.message,
        });
      });
  };
  return (
    <div className="h-screen">
      <form
        action=""
        className="w-full h-full gap-5 flex flex-col justify-center items-center"
      >
        <h1 className="text-white text-[5rem] mb-[4rem] font-bold">Sign Up</h1>
        {message.status == "error" ? (
          <span className="text-error">{message.text}</span>
        ) : (
          ""
        )}
        {message.status == "success" ? (
          <span className="text-success">{message.text}</span>
        ) : (
          ""
        )}
        <label className="sm:w-1/2 bg-transparent input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            onChange={(e) =>
              setInputs((input) => {
                return {
                  ...input,
                  username: e.target.value,
                };
              })
            }
          />
        </label>
        <label className="sm:w-1/2 bg-transparent input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            onChange={(e) =>
              setInputs((input) => {
                return {
                  ...input,
                  email: e.target.value,
                };
              })
            }
          />
        </label>
        <label className="sm:w-1/2 bg-transparent input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            value={inputs.password}
            onChange={(e) =>
              setInputs((input) => {
                return {
                  ...input,
                  password: e.target.value,
                };
              })
            }
          />
        </label>
        <label className="cursor-pointer" onClick={() => setSignIn((e) => !e)}>
          Already have a count !
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            signUpSubmit();
          }}
          className="btn btn-outline btn-neutral text-2xl font-bold px-[4rem]"
        >
           {!submit ? (
            "Submit"
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
