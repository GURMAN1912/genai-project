import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
    console.log(req.cookies.access_token);
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, "Unauthorized"));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return next(errorHandler(401, "Unauthorized"));
    }
}   