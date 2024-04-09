import { io } from "socket.io-client";
import { HOST } from "../utils/APIRoutes";

const URL = HOST;

export const socket = io(URL,{
    withCredentials: true,
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 5,
});