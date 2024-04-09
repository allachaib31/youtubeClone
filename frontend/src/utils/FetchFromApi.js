import axios from "axios";
import {
  ADDCHANNEL_ROUTE,
  ADDCOMMENT_ROUTE,
  ADDDISLIKE_ROUTE,
  ADDLIKE_ROUTE,
  DELETEVIDEO_ROUTE,
  GETCHANNEL_ROUTE,
  GETVIDEOS_ROUTE,
  GETVIDEO_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  SAVEVIDEO_ROUTE,
  SIGNUP_ROUTE,
  UPLOADVIDEO_ROUTE,
  VALIDATE_ROUTE,
  HISTORY_ROUTE
} from "./APIRoutes";

axios.defaults.withCredentials = true;

// auth Function
export const LOGIN = async (user) => {
  const { data } = await axios.post(LOGIN_ROUTE, user);
  return data;
};
export const SIGNUP = async (user) => {
  const { data } = await axios.post(SIGNUP_ROUTE, user);
  return data;
};
export const VALIDATESESSION = async () => {
  const { data } = await axios.post(VALIDATE_ROUTE);
  return data;
};
export const LOGOUT = async () => {
  const { data } = await axios.post(LOGOUT_ROUTE);
  return data;
};

// channel Function
export const GETCHANNEL = async (idChannel) => {
  const { data } = await axios.get(
    `${GETCHANNEL_ROUTE}?idChannel=${idChannel}`
  );
  return data;
};
export const ADDCHANNEL = async (channel) => {
  const { data } = await axios.post(ADDCHANNEL_ROUTE, channel);
  return data;
};

// video Function
export const UPLOADVIDEO = async (video) => {
  const { data } = await axios.post(UPLOADVIDEO_ROUTE, video);
  return data;
};
export const SAVEVIDEO = async (video) => {
  const { data } = await axios.post(SAVEVIDEO_ROUTE, video);
  return data;
};
export const DELETEVIDEO = async (idVideo) => {
  const { data } = await axios.delete(
    `${DELETEVIDEO_ROUTE}?videoId=${idVideo}`
  );
  return data;
};
export const GETVIDEO = async (idVideo) => {
  const { data } = await axios.get(GETVIDEO_ROUTE + "?videoId=" + idVideo);
  return data;
};
export const GETVIDEOS = async () => {
  const { data } = await axios.get(GETVIDEOS_ROUTE);
  return data;
};

export const ADDCOMMENT = async (comment) => {
  const { data } = await axios.post(ADDCOMMENT_ROUTE, comment);
  return data;
};

// Like & Dislike Function
export const ADDLIKE = async (like) => {
  const { data } = await axios.post(ADDLIKE_ROUTE, like);
  return data;
};
export const ADDDISLIKE = async (dislike) => {
  const { data } = await axios.post(ADDDISLIKE_ROUTE, dislike);
  return data;
};

// History Function

export const GETHISTORY = async() => {
    const { data } = await axios.get(HISTORY_ROUTE);
    return data;
}