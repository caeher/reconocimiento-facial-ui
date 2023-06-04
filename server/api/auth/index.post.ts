import { User } from '~/server/models';
import { IUser, RequestSignIn, loginUserInfo } from '~/types/user';
import { Op } from 'sequelize';
import { errorHandler } from '~/server/utils/error-handler';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    try {
        const token = event.context.session.token
        if (token) {
            const decoded = jwt.verify(token, JWT_SECRET) as { id: number }
            if (decoded) {
                return {token,decoded}
            }
        }

        return null
        
    } catch (error) {
        return errorHandler(error, event);
    }

});