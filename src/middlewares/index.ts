import express from "express";
import {get,merge} from "lodash";

import { getUserBySessionToken } from "../db/user";

export const isAuthenticated = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{//next():callback function https://www.freecodecamp.org/news/what-is-a-callback-function-in-javascript/
    try{
        const sessionToken = req.cookies['AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req,{identity:existingUser});

        return next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const isOwner = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try{
        const {id} = req.params;
        
        const currentUserId = get(req,'identity._id') as string;

        if(!currentUserId){
            return res.sendStatus(403);
        }

        if(currentUserId.toString() != id){
            return res.sendStatus(403);
        }

        return next();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}