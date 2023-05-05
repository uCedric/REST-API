import express from 'express';
import { getAllUsers,deleteUser, updateUser } from '../controllers/user';
import { isAuthenticated, isOwner } from '../middlewares/index';


export default (router:express.Router) =>{
    router.get('/user',isAuthenticated,getAllUsers);
    router.delete('/user/:id',isAuthenticated,isOwner,deleteUser);
    router.post('/user/update/:id',isAuthenticated,isOwner,updateUser);
}