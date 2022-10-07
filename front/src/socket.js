import { io } from "socket.io-client";

const URL = "https://whispering-chamber-09886.herokuapp.com";
const socket = io(URL);

export default socket;
