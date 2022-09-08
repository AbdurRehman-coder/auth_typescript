
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import Users from '../../models/user_model';

const signUpController
 = async (req: Request, res: Response) =>{
    const {email , password} = req.body;
    try{
    const hashPassword = await bcrypt.hash(password, 8);

    const createUser = await Users.create({
        email, 
        password: hashPassword
    });

    return res.json({
        message : 'User created successfully',
        body: createUser,
    });

    } catch(error){
        console.log('error occured in user signup: ', error);
    }
    
}

export default signUpController
