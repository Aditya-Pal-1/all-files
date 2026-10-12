import express from 'express';
import db from '../db/index.js'
import { UserTable } from '../models/user.model.js';
import { eq } from 'drizzle-orm';
// import {randomBytes,createHmac} from 'crypto';
import {signupPostRequestBodySchema,loginPostRequestBodySchema} from '../validation/request.validation.js'
import {hashedPasswordwithSalt} from '../utils/hash.js'
import {getUserByEmail, addUser} from '../services/user.service.js'
import jwt from 'jsonwebtoken'; 
import {createUserToken} from '../utils/token.js';

const router= express.Router();

router.post('/signup',async(req, res)=>{
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({error : validationResult.error.format()});
    }
    const {firstname,lastname,email,password} = validationResult.data;
    // const [existUser]  = await db.select({id : UserTable.id}).from(UserTable).where(eq(UserTable.email,email));
    const existUser = await getUserByEmail(email);

    if(existUser){
        return res.status(400).json({error : `User already exist with this ${email}`});
    }

    // const salt = randomBytes(256).toString('hex');
    // const hashedPassword = createHmac('sha256',salt).update(password).digest('hex');

    const {salt,password : hashedPassword} = hashedPasswordwithSalt(password);
    const user = await addUser(email,firstname,lastname,salt,hashedPassword);
    // const [user] = await db.insert(UserTable).values({
    //     email,
    //     firstname,
    //     lastname,
    //     salt,
    //     password : hashedPassword,
    // }).returning({id : UserTable.id});

    return res.status(201).json({data : {userId: user.id}})
})

router.post('/login',async(req,res)=>{
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({error : validationResult.error});
    }
    const {email,password} = validationResult.data;
    const user = await getUserByEmail(email);
    if(!user){
        return res.status(400).json({erroe : `user does not exist with this ${email}`});
    }
    const {password : hashedPassword} = hashedPasswordwithSalt(password,user.salt);
    if(user.password != hashedPassword){
        return res.status(400).json({error : 'invalid passowrd'});
    }
    
    // const token  = jwt.sign({id : user.id},process.env.JWT_SECRET);
    const token = await createUserToken({id : user.id});
    return res.json({token});
})

export default router;