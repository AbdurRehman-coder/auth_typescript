import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import mongoose, { mongo } from 'mongoose';
// import verifyAccessToken from './middlewares/verifyAccessToken';

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
.then(() => {
    app.listen(4000, () => {
        console.log('server is running on port 4000');
    })
    }
).catch(err =>{
console.log('error: ' , err);

});

