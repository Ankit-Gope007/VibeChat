import { io } from 'socket.io-client';

const socket = io("https://vibechat-krt9.onrender.com", {
  withCredentials: true
});

export default socket;
