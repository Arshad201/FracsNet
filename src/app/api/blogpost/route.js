import { BlogPost } from "@/lib/models/blogModel";
import { Thread } from "@/lib/models/threadModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server"

export const GET  = async (req, {params}) =>{
    
    try {

        const page = parseInt(req.nextUrl.searchParams.get('page'));
        const limit = parseInt(req.nextUrl.searchParams.get('resultPerPage'));

        connectToDB();

        const posts = await BlogPost.find({})
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

        return NextResponse.json({
            posts,
        }, {status: 200})
        
    } catch (error) {

        console.log(error)
        return NextResponse.json(error);
        
    }
}