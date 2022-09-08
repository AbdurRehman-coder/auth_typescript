import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import Users from '../../models/user_model';
import jwt from 'jsonwebtoken';

const signInController = async( req: Request, res: Response) =>{
    // object destructuring 
    try{
    const { email, password} = req.body;

    const existingUser = await Users.findOne({
        email,
    });
    
    console.log('existing User: ', existingUser);

    /// if user doesn't exist send invalid credentail with 403 status code
    if(!existingUser){
        return res.status(403).send('Invalid Credentails');
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if(!passwordMatch){
        return res.status(403).send('Invalid Credentails');
    }

    const accessToken = await jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
        }, process.env.ACCESS_SECRET!, {
            expiresIn : '5m',
            issuer : 'http://localhost:4000',
            subject : existingUser._id.toString(),

    });

    const refreshToken = await jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
        metadata : 'writeAnything...'
    }, process.env.REFRESH_SECRET!, {
        expiresIn : '30d',
        issuer : 'http://localhost:4000',
        subject : existingUser._id.toString(),

    });

    const updateUser = await Users.findByIdAndUpdate( existingUser._id, {
        $set: {
            refreshToken
        },
    },
        { new : true });

        return res.json({
            message : 'User Created Successfully',
            body : {
                user : existingUser,
                token : accessToken,
            },
        });
    } catch(error){
        console.log('error in sign: ', error);
    }

}

export default signInController;