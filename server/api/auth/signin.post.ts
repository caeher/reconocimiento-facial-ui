import { User } from '~/server/models';
import { IUser, RequestSignIn, loginUserInfo } from '~/types/user';
import { Op } from 'sequelize';
import { errorHandler } from '~/server/utils/error-handler';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody<RequestSignIn>(event)
    try {
        // Select user by email
        const user = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        })

        if (!user) {
            throw new Error('Email does not exist');
        }

        // compare password
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = await User.prototype.validPassword(password, user.password)
        console.log(isMatch)
        if (!isMatch) {
            throw new Error('Password does not match');
        }
        
        // generate token

        // return user info
        const loginUserInfo: loginUserInfo = {
            userid: user.userid,
            fullname: user.fullname,
            birthdate: user.birthdate,
            email: user.email,
            ecode: user.ecode,
        }
        const token = jwt.sign({ user: loginUserInfo }, JWT_SECRET, { expiresIn: '1h' });
        event.context.session.token = token;

        return {
            user: loginUserInfo,
            token
        }
    } catch (error) {
        return errorHandler(error, event);
    }

});