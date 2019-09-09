/**
 * @author Faisal Ahmed
 * @github Faisal50x
 */
import jwt from 'jsonwebtoken';
import {
    session
} from '../Config/app';

export default async (request, response, next) => {
    let token = request.headers['authorization'] || request.headers['x-access-token'];
    if (token !== undefined) {
        if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
        if (token) {
            jwt.verify(token, session.SECRET, (err, decoded) => {
                if (err) return response.status(401).json({
                    success: false,
                    message: err.message
                });
                else {
                    request.decoded = decoded;
                }
            });
        }
    } else {
        return response.status(401).json({
            success: false,
            message: 'Header Authorization undifined'
        });
    }
    next();
};