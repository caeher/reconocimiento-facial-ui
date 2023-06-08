import { readFiles } from 'h3-formidable';
import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import { Video } from '~/server/models';
import { IVideo } from '~/types/video';
import { errorHandler } from '~/server/utils/error-handler';
import { decodedAuthorization } from '../../utils/decode-token';

export default defineEventHandler(async (event) => {
    const { videoid } = await readBody<{videoid: number}>(event);
    try {
        const authorization = event.req.headers.authorization
        const user = decodedAuthorization(authorization)
        if (!user) {
            throw new Error('Token is required');
        }

        const findVideo = await Video.findOne({
            where: {
                videoid,
            }
        });


        if (!findVideo) {
            throw new Error('Video not found');
        }

        if (findVideo.userid !== user.userid) {
            throw new Error('You are not authorized to delete this video');
        }

        fs.unlinkSync(findVideo.url);
        await findVideo.destroy();

        return { success: true }

    } catch (error) {
        return errorHandler(error, event);
    }


});