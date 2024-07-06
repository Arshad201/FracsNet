import { BlogPost } from "@/lib/models/blogModel";
import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";


//Getting Thread
export const GET  = async (req, {params}) =>{

    try {

        connectToDB();

        const slug = req.nextUrl.searchParams.get('slug');

        const blogPost = await BlogPost.findOne({slug})

        return NextResponse.json({
            success: true,
            blogPost
        }, {status: 201});

        
    } catch (error) {

        return NextResponse.json(error);

    }
}