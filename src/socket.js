import io from "socket.io-client";
const sockets = io("wss://backendvideocon.herokuapp.com", {
  autoConnect: true,
  forceNew: true,
});
// wss://videoconferencingsvc-hwr7nalbaq-el.a.run.app
// 'http://192.168.0.144:3001'
// const sockets = io('/');
export default sockets;
