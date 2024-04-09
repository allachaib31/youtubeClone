import React, { useState } from "react";
import { ADDCHANNEL } from "../../utils/FetchFromApi";

function AddChannel() {
  const [submit, setSubmit] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    profileImage: "",
    coverImage: "",
  });
  const [message, setMessage] = useState({
    status: "",
    text: ""
  });
  const addChannel = () => {
    setSubmit((e) => !e);
    setMessage({
      status: "",
      text: ""
    })
    const form = new FormData();
    form.append("name", inputs.name);
    form.append("description", inputs.description);
    form.append("profileImage", inputs.profileImage);
    form.append("coverImage", inputs.coverImage);
    ADDCHANNEL(form).then((res) => {
      setSubmit((e) => !e);
      setMessage({
        status: res.status,
        text: res.message
      })
      window.location.href = `/channel?idChannel=${res.channel._id}`
    }).catch((err) => {
      setSubmit((e) => !e);
        setMessage({
          status: err.response.data.status,
          text: err.response.data.message
        })
    })
  };
  return (
    <div className="mt-[2rem] text-white  flex flex-col justify-center items-center">
      <form className="rounded-[1rem] lg:w-1/2 backdrop-blur-sm bg-[#403F3F]/30 flex flex-col gap-6 p-3">
      {message.status == "error" ? <span className="text-error">{message.text}</span>: ""}
        {message.status == "success" ? <span className="text-success">{message.text}</span>: ""}
        <label className="bg-transparent input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Name"
            onChange={(e) => {
              setInputs({ ...inputs, name: e.target.value });
            }}
          />
        </label>
        <label className="bg-transparent input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Description"
            onChange={(e) => {
              setInputs({ ...inputs, description: e.target.value });
            }}
          />
        </label>
        <div>
          <label>Profile Image : </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e) => {
              setInputs({ ...inputs, profileImage: e.target.files[0] });
            }}
          />
        </div>
        <div>
          <label>Cover Image : </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e) => {
              setInputs({ ...inputs, coverImage: e.target.files[0] });
            }}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            addChannel();
          }}
          className="btn btn-primary font-bold text-xl"
        >
          {!submit ? (
            "Submit"
          ) : (
            <span>
              <span className="loading loading-spinner"></span>
              loading
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddChannel;
