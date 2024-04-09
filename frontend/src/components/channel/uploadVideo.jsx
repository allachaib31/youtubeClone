import React, { useEffect, useState } from "react";
import { SAVEVIDEO, UPLOADVIDEO } from "../../utils/FetchFromApi";
import { socket } from "../../socket/socket";

function UploadVideo() {
  const [submit, setSubmit] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnail: "",
    categories: [],

  });
  const [startUpload, setStartUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({
    status: "",
    text: ""
  });
  const addVideo = () => {
    setSubmit((e) => !e);
    setMessage({
      status: "",
      text: ""
    })
   const form = new FormData();
    form.append("title", inputs.title);
    form.append("description", inputs.description);
    form.append("videoUrl", inputs.videoUrl);
    form.append("categories", inputs.categories);
    form.append("thumbnail", inputs.thumbnail);
    console.log(form)
    SAVEVIDEO(form).then((res) => {
      setSubmit((e) => !e);
      setMessage({
        status: res.status,
        text: res.message
      })
    }).catch((err) => {
      console.log(err)
      setSubmit((e) => !e);
        setMessage({
          status: err.response.data.status,
          text: err.response.data.message
        })
    })
  };
  const uploadVideo = (video) =>{
    setStartUpload((e) => !e)
    const form = new FormData();
    form.append("video", video);
    UPLOADVIDEO(form).then((res) =>{
      setInputs((input) => {return {
        ...input, videoUrl: res.msg
      }})
    }).catch((err)=>{
      console.log(err)
    })
  }
  const addCategories = (cat)=>{
    let newArr = [...inputs.categories];
    for (let i = 0; i < newArr.length; i++) {
      //console.log(newArr[i],cat)
      if(newArr[i] == cat) {
        newArr.splice(i,1);
        setInputs((input) => {return {
          ...input,categories: newArr
        }})
        return;
      }
      
    }
    newArr.push(cat);
    setInputs((input) => {return {
      ...input,categories: newArr
    }})

  }
  useEffect(()=>{
    socket.on("progress",(data)=>{
      console.log(data)
      setProgress(data);
    })
  },[]);
  return (
    <div className="mt-[2rem] text-white  flex flex-col justify-center items-center">
      <form className="rounded-[1rem] lg:w-1/2 backdrop-blur-sm bg-[#403F3F]/30 flex flex-col gap-6 p-3">
      {message.status == "error" ? <span className="text-error">{message.text}</span>: ""}
        {message.status == "success" ? <span className="text-success">{message.text}</span>: ""}
        <label className="bg-transparent input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Title"
            onChange={(e) => {
              setInputs((input) => {return  { ...input, title: e.target.value }});
            }}
          />
        </label>
        <label className="bg-transparent input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Description"
            onChange={(e) => {
              setInputs((input) => {return { ...input, description: e.target.value }});
            }}
          />
        </label>
        <div className="flex flex-wrap gap-5">
        <span className="flex items-center">Gaming <input onChange={(e) => addCategories(e.target.value)} type="checkbox" value="Gaming" className="checkbox" /></span>
        <span className="flex items-center">Vlog <input onChange={(e) => addCategories(e.target.value)} type="checkbox" value="Vlog" className="checkbox" /></span>
        <span className="flex items-center">Comedy <input onChange={(e) => addCategories(e.target.value)} type="checkbox" value="Comedy" className="checkbox" /></span>
        <span className="flex items-center">Movie <input onChange={(e) => addCategories(e.target.value)} type="checkbox" value="Movie" className="checkbox" /></span>
        <span className="flex items-center">Animation <input onChange={(e) => addCategories(e.target.value)} type="checkbox" value="Animation" className="checkbox" /></span>
        <span className="flex items-center">Kids <input onChange={(e) => addCategories(e.target.value)} type="checkbox" value="Kids" className="checkbox" /></span>
        <span className="flex items-center">Documentary <input type="checkbox" value="Documentary" className="checkbox" /></span>
        <span className="flex items-center">Travel <input onChange={(e) => addCategories(e.target.value)} type="checkbox" value="Travel" className="checkbox" /></span>
        </div>
        <div className="flex flex-col">
          <label>choose Thumbnail : </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e) => {
              setInputs((input) => {return {...input,thumbnail: e.target.files[0]}});
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Upload Video : </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e) => {
              uploadVideo(e.target.files[0]);
            }}
          />
          <div className={`${!startUpload ? "hidden" : ""} radial-progress`} style={{"--value":progress}} role="progressbar">{progress}%</div>
        </div>
        <button
          disabled={submit}
          onClick={(e) => {
            e.preventDefault();
            addVideo();
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

export default UploadVideo;