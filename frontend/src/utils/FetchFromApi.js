import axios from "axios";
import { LOGIN_ROUTE, LOGOUT_ROUTE, SIGNUP_ROUTE, VALIDATE_ROUTE } from "./APIRoutes";

axios.defaults.withCredentials = true;

// auth Function
export const LOGIN = async (user) => {
    const { data } = await axios.post(LOGIN_ROUTE, user);
    return data;
}
export const SIGNUP = async (user) => {
    const { data } = await axios.post(SIGNUP_ROUTE,user);
    return data;
}
export const VALIDATESESSION = async () => {
    const { data } = await axios.post(VALIDATE_ROUTE);
    return data;
}
export const LOGOUT = async () =>{
    const { data } = await axios.post(LOGOUT_ROUTE);
    return data;
}