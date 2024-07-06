import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs";

export const POST = async (req, { params }) => {

    try {

        connectToDB();

        const body = await req.json();
        const { email, password, confirmPassword } = body;

        const errors = {}
        errors.email = "";
        errors.password = "";
        errors.confirmPassword = "";

        if(!email) errors.email = "Email is required"

        const user = await User.findOne({ email });

        if (user) errors.email = "This Email has already a FracsNet account"
        if(password.length < 6) errors.password = "Password should have atleast 6 characters"
        if(!password) errors.password = "Password is required"
        if(!confirmPassword) errors.confirmPassword = "Confirm Your Password"

        if (password !== confirmPassword) errors.confirmPassword = "Confirm Password is not equal to password"


        if(errors.email || errors.password || errors.confirmPassword){
            return NextResponse.json({
                success: false,
                errorType: 'obj',
                errors
            }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email, password: hashedPassword
        })

        return NextResponse.json({
            success: true,
            message: "User registerd successfully!",
            newUser
        }, { status: 201 });


    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}