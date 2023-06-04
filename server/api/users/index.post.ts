import { User } from '~/server/models';
import { IUser, CreateUser, RequestCreateUser } from '~/types/user';
import { Op } from 'sequelize';
import { generateCodeUser } from '~/server/utils/generate-code-user';
import { errorHandler } from '~/server/utils/error-handler';
import bcrypt from 'bcrypt';

const SECRET = useRuntimeConfig().SECRET;

export default defineEventHandler(async (event) => {
  const { birthdate, email, fullname, password, password_confirm } = await readBody<RequestCreateUser>(event);

  try {
    if (password !== password_confirm) {
      throw new Error('Password does not match');
    }

    const user: CreateUser = {
      birthdate,
      email,
      fullname,
      password,
      ecode: generateCodeUser()
    }

    // Select user by email
    const existUser = await User.findOne({
      where: {
        email: {
          [Op.eq]: user.email
        }
      }
    })

    if (existUser) {
      throw new Error('Email already exist');
    }

    // encript password
    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hashSync(user.password, salt);
    const newUser = await User.create(user);

    return newUser;

  } catch (error) {
    return errorHandler(error, event);
  }
  
});