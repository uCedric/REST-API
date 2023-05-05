import express from 'express';
import {getUsers,deleteUserById,getUserById,updateUserById} from '../db/user';


export const getAllUsers = async (req:express.Request,res:express.Response)=>{
    try{
        const user = await getUsers();

        return res.status(200).json(user);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req:express.Request,res:express.Response)=>{
    try{
        const {id} = req.params;

        const deletedUser =await deleteUserById(id);
        return res.json(deletedUser);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req:express.Request,res:express.Response)=>{
    try{
        const {id} =req.params;
        const {username} = req.body;

        if(!username){
            return res.sendStatus(400);
        }

        const user =await getUserById(id); 

        user.username=username;

        const result=await updateUserById(id,user);

        return res.status(200).json(result);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}