import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
console.log("process.env", process.env.NODE_ENV);
const URL =
  // process.env.NODE_ENV === "production" ? undefined : `http://localhost:8080`;
  process.env.NODE_ENV === "production" ? undefined : `http://localhost:5000`;

export const socket = io(URL, {
  autoConnect: false,
});
