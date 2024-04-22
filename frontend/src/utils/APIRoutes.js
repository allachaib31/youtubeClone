export const HOST = `http://localhost:5000/`;
// auth Route
export const LOGIN_ROUTE = `${HOST}auth/login`;
export const SIGNUP_ROUTE = `${HOST}auth/signUp`;
export const LOGOUT_ROUTE = `${HOST}auth/logout`;
export const VALIDATE_ROUTE = `${HOST}auth/validSession`;

// channel Route
export const GETCHANNEL_ROUTE = `${HOST}channel/getChannel`;
export const ADDCHANNEL_ROUTE = `${HOST}channel/addChannel`;

// Video Route
export const UPLOADVIDEO_ROUTE = `${HOST}video/uploadVideo`;
export const SAVEVIDEO_ROUTE = `${HOST}video/saveVideo`;
export const DELETEVIDEO_ROUTE = `${HOST}video/deleteVideo`
export const GETVIDEO_ROUTE = `${HOST}video/getVideo`;
export const GETVIDEOS_ROUTE = `${HOST}video/getVideos`;

// Comment Route
export const ADDCOMMENT_ROUTE = `${HOST}comment/addComment`;

// Like & Dislike Route
export const ADDLIKE_ROUTE = `${HOST}like`;
export const ADDDISLIKE_ROUTE = `${HOST}dislike`;

// History Route
export const HISTORY_ROUTE = `${HOST}history`;

// Search Route 
export const SEARCH_ROUTE = `${HOST}search`