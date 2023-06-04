import { User } from '~/server/models';
import { IUser } from '~/types/user';
import { Op } from 'sequelize';
import { errorHandler } from '~/server/utils/error-handler';
import bcrypt from 'bcrypt'
import { decodedAuthorization } from '../../utils/decode-token';

export default defineEventHandler(async (event) => {
    try {
        const authorization = event.req.headers.authorization
        const user = decodedAuthorization(authorization)
        if (!user) {
            throw new Error('Token is required');
        }

        const profile = parseInt(user.userid) as number
        
        const userData = await User.findOne({
            attributes: {
                exclude: ['password'],
            },
            where: {
                userid: {
                    [Op.eq]: profile
                }
            }
        })

        if (!userData) {
            throw new Error('User not found');
        }

        return userData
        
    } catch (error) {
        return errorHandler(error, event);
    }

});