import { BlogPost } from "@/lib/models/blogModel";
import { Thread } from "@/lib/models/threadModel";
import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";

export const POST  = async (req, {params}) =>{
    
    try {

        //Connected to Database
        connectToDB();

        //Get Data from the body
        const body = await req.json(); 
        const {email, password, confirmPassword} = body;

        //Check User is already exist with this given Email by the new user
        const user = await User.findOne({email});

        //Throw Error If user is Already exist with this given Email by the new user
        if(user){
            return NextResponse.json({
                success: false,
                message: `This Email is already in used!`
            }, {status: 200});
        }

        //Throw Error if password and confirm password are not equal
        if(password !== confirmPassword){
            return NextResponse.json({
                success: false,
                message: `Passwords are not same!`
            }, {status: 200});
        }


        //Generate a hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Save new user in Database
        const newUser = await User.create({
            email, password:hashedPassword
        })


        return NextResponse.json({
            success: true,
            message: "User registerd successfully!",
            newUser
        }, {status: 201});


    } catch (error) {

        console.log(error)
        NextResponse.json(error);
        
    }
}