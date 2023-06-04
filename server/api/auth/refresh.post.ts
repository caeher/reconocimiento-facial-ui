import { User } from '~/server/models';
import { IUser, RequestSignIn, loginUserInfo } from '~/types/user';
import { Op } from 'sequelize';
import { errorHandler } from '~/server/utils/error-handler';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    try {
        const { token }= await readBody(event)
        if (token) {
            const decoded:any = jwt.verify(token, JWT_SECRET) as { id: number }
            if (decoded) {
                return {user: decoded.user}
            }
        }

        return null
        
    } catch (error) {
        return errorHandler(error, event);
    }

});