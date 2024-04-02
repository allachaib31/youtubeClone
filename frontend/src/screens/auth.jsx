import React, { useState } from "react";
import loginBg from "../images/loginBg.png";
import signUpBg from "../images/signUpBg.png";
import { SignIn, SignUp } from "../components";
function Auth() {
  const [signIn, setSignIn] = useState(true);
  return (
    <div
      className="hero min-h-screen delay-[3000] duration-1000 ease-out"
      style={{
        backgroundImage: `url(${signIn ? loginBg : signUpBg})`,
      }}
    >
      <div
        className={`w-full ${
          signIn ? "md:translate-x-[40%] lg:w-[45%]" : "translate-x-[0%]"
        }  transition delay-[3000] duration-1000 ease-out text-center text-neutral-content`}
      >
        <div className="md:w-[60%] lg:w-[45%] h-screen backdrop-blur-xl bg-black/40">
          {signIn ? (
            <SignIn setSignIn={setSignIn} />
          ) : (
            <SignUp setSignIn={setSignIn} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
