import { Op } from 'sequelize';
import { Attendance } from '~/server/models';
import { IAttendance } from '~/types/attendance';


export default defineEventHandler(async (event) => {
        const authorization = event.req.headers.authorization
        if (!authorization) {
            event.node.res.statusCode = 401;
            return { success: false, message: "Token is required" }
        }
        const user = decodedAuthorization(authorization)
        if (!user) {
            throw new Error('Token is required');
        }
       
    try {
        const attend = await Attendance.findAll({
            where: {
                userid: user.userid,
                timeout: null
            }
        });

        if (attend.length > 0) {
            return { success: true, message: "Ya se registro su entrada" }
        } else {
            await Attendance.create({
                userid: user.userid,
                date: new Date(),
                timein: new Date()
            });
            return { success: true, message: "Se registro su entrada" }
        }

    } catch (error) {
        return errorHandler(error, event);
    }


});