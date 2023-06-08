import { readFiles } from 'h3-formidable';
import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import { Video } from '~/server/models';
import { IVideo } from '~/types/video';
import { errorHandler } from '~/server/utils/error-handler';
import { decodedAuthorization } from '../../utils/decode-token';
import WebSocket, { WebSocketServer } from "ws"

export default defineEventHandler(async (event) => {
    const { files: { file: [{ filepath, mimetype }] } } = await readFiles(event, {
        includeFields: true
    });
    try {
        const authorization = event.req.headers.authorization
        const user = decodedAuthorization(authorization)
        if (!user) {
            throw new Error('Token is required');
        }
        console.log(user)
        let imageName = String(Date.now()) + String(Math.round(Math.random() * 10000000));
        let newDir = `${path.join("uploads", "videos", 'users', user.ecode ?? "uknow")}`;

        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
        }

        let newPath = `${path.join(newDir,imageName)}.${mimetype.split('/')[1]}`
        fs.copyFileSync(filepath, newPath);

        await Video.create({
            url: newPath,
            userid: user.userid
        }).catch((err) => {
            console.log(err);
            fs.unlinkSync(newPath);
        });

        const ws = new WebSocket('ws://localhost:8765');
        let message = "Hola desde el servidor";

        ws.on('open', function open() {
            console.log('Conexión establecida');
            const sendData = JSON.stringify(['generar', [user.ecode, newPath]]);
            ws.send(sendData);
        });

        ws.on('close', function close() {
            console.log('Conexión cerrada');
        });

        return { success: true }

    } catch (error) {
        return errorHandler(error, event);
    }


});