export interface IUser {
    userid?: number;
    fullname: string;
    ecode: string;
    birthdate: Date;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Profile = Omit<IUser, 'password'>

export type CreateUser = Omit<IUser, 'userid' | 'createdAt' | 'updatedAt'>

export type RequestCreateUser = Omit<CreateUser, 'ecode'> & { password: string, password_confirm: string }

export type RequestSignIn = { email: string, password: string }

export type loginUserInfo = Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>