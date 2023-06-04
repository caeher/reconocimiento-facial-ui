import WebSocket, { WebSocketServer } from "ws"

type Client = {
  id: string
  send: (message: string) => void
  readyState: number
}

declare global {
  var wss: WebSocketServer
  var clients: Client[]
}

let wss: WebSocketServer
let clients: Client[] = []

export default defineEventHandler((event) => {
  
  if (!global.wss) {
    wss = new WebSocketServer({ port: 8764 })
    
    
    wss.on("connection", function (socket) {
  
      socket.send("connected")

      socket.on("message", function (message) {
        wss.clients.forEach(function (client) {
          if (client == socket && client.readyState === WebSocket.OPEN) {
            if (clients.some((client) => client.id === message.toString())) {
              client.send("Ya existe un cliente con ese id")
              return
            }
            clients.push({
              id: message.toString(),
              send: (data: string) => client.send(data),
              readyState: client.readyState,
            })
            global.clients = clients
          }
          
        })
      })

      socket.on("close", function () {
        console.log("closed")
        clients = clients.filter(function (client) {
          return client !== socket
        })
        global.clients = clients
      })
    })
    global.wss = wss
  }
})