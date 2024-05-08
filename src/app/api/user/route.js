import { User } from "@/lib/models/userModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET  = async (req, {params}) =>{
    
    try {

        const page = parseInt(req.nextUrl.searchParams.get('page'));
        const limit = parseInt(req.nextUrl.searchParams.get('resultPerPage'));

        connectToDB();

        const users = await User.find({featured: true})
        .limit(limit)
        .skip((page - 1) * limit)

        return NextResponse.json({
            users,
        }, {status: 200})
        
    } catch (error) {

        console.log(error)
        NextResponse.json(error);
        
    }
}