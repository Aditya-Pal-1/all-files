/**
 * 
 * @param {import ("express" ).Request} req 
 * @param {import ("express" ).Response} res 
 * @param {import ("express" ).NextFunction} next 
 */

import { validateUserToken } from "../utils/token.js";

 
export  function authenticationMIddleware(req,res,next){
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        next();
    }
     if (!authHeader.startsWith('Bearer')) {
        return res.status(400).json({ error: "Authorization must start with Bearer" });
    }
    try {
        const token = authHeader.split(' ')[1];
        const payload = validateUserToken(token);

        if (!payload) {
            return res.status(401).json({ error: "Invalid token" });
        }

        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}