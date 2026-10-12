import jwt from 'jsonwebtoken';
import {usertokenSchema} from '../validation/token.validation.js';
const JWT_SECRET = process.env.JWT_SECRET;

export  async function createUserToken(payload){
    const validationResult = await usertokenSchema.safeParseAsync(payload);
    if(validationResult.error){
        throw new Error(validationResult.error.message);
    }
    const payloadValidated = validationResult.data;
    const token = jwt.sign(payloadValidated, JWT_SECRET);
    return token; 
}

export function validateUserToken(token){
    try {
        const payload = jwt.verify(token,JWT_SECRET);
        return payload;
    } catch (error) {
        return null;
    }
}
