import path from 'path';
import { Op } from 'sequelize';
import {  Attendance } from '~/server/models';
import { IVideo } from '~/types/video';
import { errorHandler } from '~/server/utils/error-handler';
import { decodedAuthorization } from '../../utils/decode-token';

export default defineEventHandler(async (event) => {

    try {
        const authorization = event.req.headers.authorization
        const user = decodedAuthorization(authorization)
        if (!user) {
            throw new Error('Token is required');
        }

        const attendances = await Attendance.findAll({
            where: {
                userid: user.userid
            }
        });
        return attendances

    } catch (error) {
        return errorHandler(error, event);
    }
    
});