import WebSocket, { WebSocketServer } from "ws"
import { readFiles } from 'h3-formidable';
import { readFileSync } from 'fs';
import path from 'path';
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


export default defineEventHandler(async (event) => {
    const { files: { video }, fields } = await readFiles(event, {
        includeFields: true
    });
    const { sender, clave } = fields;
    
    const binaryVideo = readFileSync(video[0].filepath);

    const ws = new WebSocket('ws://localhost:8765');
    let message = "Hola desde el servidor";

    ws.on('open', function open() {
        console.log('Conexión establecida');
        const sendData = JSON.stringify([clave.toString(), binaryVideo]);
        ws.send(sendData);
    });

    ws.on('message', function incoming(data:any) {
        globalThis.clients.forEach(function (client, isBinary) {    
            if (client.id === sender.toString() && client.readyState === WebSocket.OPEN) {
                client.send(data.toString())
            }
        })
    });

    ws.on('close', function close() {
        console.log('Conexión cerrada');
    });

    return {
        statusCode: 200,
        body: "This is done",
    }
})



