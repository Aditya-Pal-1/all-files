import express from 'express';
import {shortenPostRequestBodySchema} from '../validation/request.validation.js';
import db from '../db/index.js';
import {urlTable} from '../models/url.model.js'
import { nanoid } from 'nanoid';

const router = express.Router();
router.post('/shorten',async (req, res)=>{
    const userId = req.user?.id;
    if(!userId){
        return res.status(400).json({error : 'You must be logged in to acces this'});
    }
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({error : validationResult.error.message});
    }
    const {url,code} = validationResult.data;
    const shortCode = code ?? nanoid(6);
    const [result] =   await db.insert(urlTable).values({
        shortCode,
        targetUrl:url,
        userId : userId 
    }).returning({
        id : urlTable.id,
        shortCode : urlTable.shortCode,
        targetURL : urlTable.targetUrl,
    });
    return res.status(201).json({id : result.id, shortCode : result.shortCode, targeUrl : result.targetURL});
})



export default router;