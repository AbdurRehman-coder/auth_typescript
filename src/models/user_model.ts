

import mongoose, { Schema } from "mongoose";

  const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true,
        maxLength: 50
        
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    token: {
        type: String,
        required: false,
        default: ""
    }
  },{
  timestamps: true,
});

const Users = mongoose.model("User", userSchema)

export  default Users;