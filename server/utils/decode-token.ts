
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = useRuntimeConfig();

export function decodedAuthorization(authorization: string | undefined) {
    if (!authorization) {
        throw new Error('Authorization is required');
    }   
    const bearer = authorization.split(' ');
    if (bearer.length !== 2) {
        throw new Error('Invalid authorization');
    }
    const token = bearer[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.user;
}
