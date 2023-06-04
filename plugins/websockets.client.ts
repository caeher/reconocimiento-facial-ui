// const { Server } = require("socket.io");

// const io = new Server({
//   serveClient: false
// });

export default defineNuxtPlugin(() => {
  if (process.server) return
  // const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
  // let socket2 = new WebSocket(`${wsProtocol}//localhost:8764`)
  // socket2.onopen = () => {
  //   console.log("evento: ", event)
  //   socket2.send("uid")
  // }
  // console.log(socket2.readyState); // readyState will be 0
  return {
    provide: {
      // socket2
    },
  }
})